import { Component } from "react";
import { LoginTemplate } from "./LoginTemplate";
import { UserData } from "../../interfaces/UserData";

export class Login extends Component<{}, UserData> {
    state: UserData = {
        email: null,
        password: null,
        confirmation: null,
    };

    render(): JSX.Element {
        return (
            <LoginTemplate />
        );
    }
}