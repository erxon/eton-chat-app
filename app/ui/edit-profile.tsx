"use client";

import FileUpload from "./components/FileUpload";
import TextField from "./components/TextField";
import PasswordField from "./components/PasswordField";
import { useFormState, useFormStatus } from "react-dom";
import { updateUser } from "../lib/user/actions";
import { v4 as uuidv4 } from "uuid";
import Loading from "./components/Loading";
import DatePicker from "./components/DatePicker";
import { useState } from "react";

interface EditProfileFormProps {
  withProvider?: boolean;
  firstName?: string;
  lastName?: string;
  image?: string;
  email?: string | null;
  address?: string | null;
  about?: string | null;
  birthday?: string | null;
  contactNumber?: string | null;
  gender?: string | null;
  age?: Number | null;
}

function Submit() {
  const status = useFormStatus();
  return (
    <button
      type="submit"
      className="w-full md:w-fit flex justify-center items-center mr-2 text-sm inline-block px-3 py-1 rounded outline outline-1 outline-gray-900 text-black transition enabled:hover:bg-gray-900 enabled:hover:text-white disabled:opacity-50"
      disabled={status.pending}
    >
      Save
      <div hidden={!status.pending} className="ml-2">
        <Loading />
      </div>
    </button>
  );
}

export default function EditProfileForm(props: EditProfileFormProps) {
  const initialState = { message: "", success: false, errors: {} };
  const [state, dispatch] = useFormState(updateUser, initialState);
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    new Date(props.birthday ? props.birthday : new Date())
  );

  return (
    <>
      <form action={dispatch}>
        <div className="flex flex-col w-full lg:w-fit">
          {!props.withProvider && <FileUpload image={props.image} />}
          {state.errors && state.errors.avatar && (
            <p className="text-red-500 text-sm">{state.errors.avatar}</p>
          )}
          <div className="w-full">
            {/* Name */}
            <div className="mb-2 flex flex-col md:flex-row mb-5">
              <div className="w-full mb-2 md:mr-2">
                <label htmlFor="firstName" className="text-sm">
                  First name
                </label>
                <TextField
                  name="firstName"
                  placeholder="First Name"
                  defaultValue={props.firstName}
                />
                {state.errors?.firstName &&
                  state.errors?.firstName.map((error: string) => {
                    return (
                      <p className="text-red-300" key={uuidv4()}>
                        {error}
                      </p>
                    );
                  })}
              </div>
              <div className="w-full">
                <label htmlFor="lastName" className="text-sm">
                  Last name
                </label>
                <TextField
                  name="lastName"
                  placeholder="Last Name"
                  defaultValue={props.lastName}
                />
              </div>
            </div>
            <div className="mb-5">
              <p className="font-medium mb-2">Other information</p>
              <div className="w-full mb-2">
                <label htmlFor="email" className="text-sm">
                  Email
                </label>
                <TextField
                  name="email"
                  placeholder="email"
                  defaultValue={props.email ? props.email : ""}
                />
              </div>
              <div className="w-full mb-2">
                <label htmlFor="contactNumber" className="text-sm">
                  Contact Number
                </label>
                <TextField
                  name="contactNumber"
                  placeholder="Contact Number"
                  defaultValue={props.contactNumber ? props.contactNumber : ""}
                />
              </div>
              <div className="w-full mb-2">
                <label htmlFor="address" className="text-sm">
                  Address
                </label>
                <TextField
                  name="address"
                  placeholder="Address"
                  defaultValue={props.address ? props.address : ""}
                />
              </div>
              <div className="mb-2">
                <p className="text-sm mb-1">Birthday</p>
                <DatePicker
                  age={props.age ? props.age : null}
                  selectedDate={selectedDate}
                  setSelectedDate={setSelectedDate}
                />
              </div>
              <div className="mb-2">
                <p className="mb-1 text-sm">Gender</p>
                <div className="flex gap-3">
                  <div className="flex gap-1 items-center">
                    <input
                      type="radio"
                      name="gender"
                      className="radio radio-sm"
                      value="Male"
                      id="male"
                      defaultChecked={props.gender === "Male"}
                    />
                    <label htmlFor="male" className="text-sm">
                      Male
                    </label>
                  </div>
                  <div className="flex gap-1 items-center">
                    <input
                      type="radio"
                      name="gender"
                      className="radio radio-sm"
                      value="Female"
                      id="female"
                      defaultChecked={props.gender === "Female"}
                    />

                    <label htmlFor="female" className="text-sm">
                      Female
                    </label>
                  </div>
                  <div className="flex gap-1 items-center">
                    <input
                      type="radio"
                      name="gender"
                      className="radio radio-sm"
                      value="none"
                      id="none"
                      defaultChecked={props.gender === "none"}
                    />
                    <label htmlFor="none" className="text-sm">
                      Rather not say
                    </label>
                  </div>
                </div>
              </div>
              <div>
                <p className="text-sm mb-1">About</p>
                <textarea
                  name="about"
                  className="rounded-md resize-none p-3 w-full h-[100px] placeholder:text-sm outline outline-1 outline-neutral-400"
                  placeholder="Type here other information about yourself..."
                  defaultValue={props.about ? props.about : ""}
                ></textarea>
              </div>
            </div>
          </div>
          {/* Password fields */}
          <div className="mt-3">
            <p className="font-medium mb-2">Change Password</p>
            <div className="flex mb-1 flex-col md:flex-row">
              <PasswordField
                name="password"
                placeholder="Password"
                style="mb-2 md:mr-2"
                disabled={props.withProvider}
              />
              <PasswordField
                name="confirmPassword"
                placeholder="Confirm password"
                disabled={props.withProvider}
              />
            </div>
            {props.withProvider && (
              <p className="text-gray-500 text-sm">
                You have signed up using a provider
              </p>
            )}
          </div>
        </div>
        <div className="flex gap-1 items-center mt-4">
          <Submit />
          <button className="btn btn-sm btn-outline btn-error">Delete</button>
        </div>
      </form>
      {state.success ? (
        <div className="mt-3 text-sm bg-green-300 rounded p-3 shadow w-full text-center md:w-fit">
          <p>{state.message}</p>
        </div>
      ) : (
        state.message && (
          <div className="mt-3 text-sm bg-red-300 rounded p-3 shadow w-full text-center md:w-fit">
            <p>{state.message}</p>
          </div>
        )
      )}
    </>
  );
}
