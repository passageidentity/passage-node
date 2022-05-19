/* eslint-disable no-unused-vars */
import { PassageConfig } from "../types/PassageConfig";
import axios from "axios";

type UserMetadataFieldType = string;

type UserMetadataField = {
  handle: string;
  field_name: string;
  field_type: UserMetadataFieldType;
  friendly_name: string;
  registration: boolean;
  profile: boolean;
};

type LayoutConfig = {
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
};

type Layouts = {
  registration: Array<LayoutConfig>;
  profile: Array<LayoutConfig>;
};

interface AppObject {
  name: string;
  id: string;
  auth_origin: string;
  redirect_url: string;
  login_url: string;
  rsa_public_key: string;
  allowed_identifier: string;
  required_identifier: string;
  require_email_verification: boolean;
  session_timeout_length: number;
  user_metadata_schema: Array<UserMetadataField>;
  layouts: Array<Layouts>;
}

/***/
export default class App {
    #appID: string;
    #apiKey: string;
    #authorizationHeader: object | undefined;
    id: string;

    /**
   * Initialize a new Passage App instance.
   *
   * @param {PassageConfig} config The default config for Passage and App initialization
   */
    constructor(config: PassageConfig) {
        this.#appID = config.appID ? config.appID : "";
        this.#apiKey = config.apiKey ? config.apiKey : "";
        this.id = "";

        if (this.#apiKey) {
            this.#authorizationHeader = {
                headers: {
                    Authorization: `Bearer ${this.#apiKey}`,
                },
            };
        } else {
            this.#authorizationHeader = undefined;
        }
    }

    /**
   * Get App Info about an app
   *
   * @return {Promise<AppObject>} Passage App object
   */
    async get(): Promise<AppObject> {
        if (!this.#apiKey) {
            throw new Error("A Passage API key is needed to make a getUser request");
        }

        const appData: AppObject = await axios
            .get(
                `https://api.passage.id/v1/apps/${this.#appID}`,
                this.#authorizationHeader
            )
            .catch((err) => {
                throw new Error(
                    `Could not fetch user. HTTP status: ${err.response.status}`
                );
            })
            .then((res) => {
                return res.data.app;
            });

        return appData;
    }
}
