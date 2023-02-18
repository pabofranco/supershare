import { Component } from "react";
import { RegistrationTemplate } from "./RegistrationTemplate";
import { UserData } from "../../interfaces/UserData";


export class Registration extends Component<{}, UserData> {
    state: UserData = {
        email: null,
        password: null,
        confirmation: null,
    };

    render(): JSX.Element {
        return (
            <RegistrationTemplate />
        );
    }
}