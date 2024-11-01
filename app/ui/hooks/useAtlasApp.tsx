"use client"

import { useEffect, useState } from "react";
import * as Realm from "realm-web";
import { App } from "realm-web";


export function useAtlasApp(){
    const [app, setApp] = useState<App>();

    useEffect(() => {
        setApp(Realm.getApp(process.env.NEXT_PUBLIC_MONGODB_APP_ID!));
    }, []);

    return app;
}