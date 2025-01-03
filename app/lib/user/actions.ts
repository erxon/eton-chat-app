"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import {
  hashPassword,
  isEmailExist,
  isPasswordMatch,
} from "../utilities/auth-utils";
import { isEmpty } from "../utilities/for-form";
import { signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";
import { create, update } from "../database/user-db";
import { auth } from "@/auth";
import { checkFile, imageUpload } from "../utilities/for-form";
import { v2 as cloudinary } from "cloudinary";
import { signIn as signInWithProvider } from "@/auth-with-provider";
import { createProfile } from "../database/profile-db";
import { updateProfile } from "../database/profile-db";
import { isNull } from "lodash";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const FormSchema = z.object({
  firstName: z.string({
    invalid_type_error: "Please add a first name.",
  }),
  lastName: z.string({
    invalid_type_error: "Please add a last name.",
  }),
  email: z.string({
    invalid_type_error: "Please add an email.",
  }),
  password: z.string({
    invalid_type_error: "Please add a password.",
  }),
  confirmPassword: z.string({
    invalid_type_error: "Confirm your password.",
  }),
});

export type State = {
  errors?: {
    firstName?: string[];
    lastName?: string[];
    email?: string[];
    password?: string[];
    confirmPassword?: string[];
  };
  message?: string | null;
};

export type UpdateUserState = {
  errors?: {
    firstName?: string[];
    lastName?: string[];
    avatar?: string[];
  };
  message?: string | null;
  success?: boolean | null;
};

export async function createUser(prevState: State, formData: FormData) {
  const validatedFields = FormSchema.safeParse({
    firstName: isEmpty("firstName", formData)
      ? null
      : formData.get("firstName"),
    lastName: isEmpty("firstName", formData) ? null : formData.get("lastName"),
    email: isEmpty("email", formData) ? null : formData.get("email"),
    password: isEmpty("password", formData) ? null : formData.get("password"),
    confirmPassword: isEmpty("confirmPassword", formData)
      ? null
      : formData.get("confirmPassword"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create User",
    };
  }

  const { firstName, lastName, email, password, confirmPassword } =
    validatedFields.data;

  //check if email is unique
  if (await isEmailExist(email)) {
    return {
      message: "Email already exists",
    };
  }
  //compare confirm password and password
  if (!isPasswordMatch(password, confirmPassword)) {
    return {
      message: "Password didn't match",
    };
  }

  //encrypt password
  let id: string;
  try {
    const encryptedPassword = await hashPassword(password);
    const newUser = await create({
      email: email,
      name: `${firstName} ${lastName}`,
      hash: encryptedPassword.hash,
      salt: encryptedPassword.salt,
    });

    await createProfile(email);

    id = newUser.id;
  } catch (error) {
    return { message: `${error}` };
  }

  revalidatePath("/welcome");
  redirect(`/welcome`);
}

const UpdateUserSchema = z.object({
  firstName: z.string({
    invalid_type_error: "Please add first name",
  }),
  lastName: z.string({
    invalid_type_error: "Please add last name",
  }),
  password: z.string().optional(),
  confirmPassword: z.string().optional(),
  avatar: z
    .any()
    .refine((file) => file?.size <= 5000000, "Maximum image size is 5MB")
    .refine(
      (file) => ["image/png", "image/jpeg", "image/jpg"].includes(file?.type),
      "Only accepts image png, jpg, and jpeg formats"
    )
    .optional(),
});

export async function updateUser(
  prevState: UpdateUserState,
  formData: FormData
) {
  const imageFile = formData.get("avatar") as File;
  const image = await checkFile(imageFile);

  const validatedFields = UpdateUserSchema.safeParse({
    firstName: formData.get("firstName") ? formData.get("firstName") : null,
    lastName: formData.get("lastName") ? formData.get("lastName") : null,
    password: formData.get("password") ? formData.get("password") : undefined,
    confirmPassword: formData.get("confirmPassword")
      ? formData.get("confirmPassword")
      : undefined,
    avatar: image,
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Something went wrong",
      success: false,
    };
  }

  const { firstName, lastName, password, confirmPassword, avatar } =
    validatedFields.data;

  try {
    const session = await auth();
    const email = session?.user?.email;

    //image upload
    if (avatar) {
      const uploadURL = await imageUpload(avatar);
      const updateResult = await update(email, {
        image: uploadURL,
      });
      const oldImage = updateResult?.image as string;
      const publicId = oldImage.substring(
        oldImage.length - 24,
        oldImage.length - 4
      );
      //delete old image
      await cloudinary.uploader.destroy(publicId);
    }

    //change password
    if (password && confirmPassword) {
      if (!isPasswordMatch(password, confirmPassword)) {
        return {
          message: "Password did not match",
          success: false,
        };
      }
      const encryptedPassword = await hashPassword(password);
      await update(email, {
        hash: encryptedPassword.hash,
        salt: encryptedPassword.salt,
      });
    }

    //update user
    await update(email, {
      name: `${firstName} ${lastName}`,
    });

    //update profile
    const birthday = formData.get("birthday");
    let age = 0;
    if (birthday) {
      let age =
        (new Date().getTime() - new Date(birthday.toString()).getTime()) /
        (3.154 * 10 ** 10);
      age = Math.floor(age);
    }

    await updateProfile(email, {
      address: formData.get("address")
        ? formData.get("address")?.toString()
        : "",
      contactNumber: formData.get("contactNumber")
        ? formData.get("contactNumber")?.toString()
        : "",
      about: formData.get("about") ? formData.get("about")?.toString() : "",
      birthday: !isNull(birthday) ? new Date(birthday.toString()) : undefined,
      age: age,
      gender: formData.get("gender") ? formData.get("gender")?.toString() : "",
    });

    revalidatePath("/profile/welcome");

    return {
      errors: {},
      success: true,
      message: "User was successfully updated",
    };
  } catch (error) {
    return { message: `${error}` };
  }
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    const result = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });

    revalidatePath("/welcome");
    redirect("/welcome");
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}

export async function signInWithGoogle() {
  await signInWithProvider("google");
}

export async function signOutTrigger() {
  const result = await signOut({ redirect: false, redirectTo: "/login" });
  redirect(result.redirect);
}
