import { building, dev } from "$app/env";
import { defineEnvVars } from "@sveltejs/kit/env";
import * as v from "valibot";

export const variables = defineEnvVars({
	API_BASE_MAIN: {
		description: "base URL of publicly accessible api server",
		public: true,
		static: true,
		schema: v.pipe(v.string(), v.url()),
	},
	API_BASE_LOCAL: {
		description:
			"base URL of locally-hosted api server (used only as a fast-path for SSR)",
		static: true,
		schema: v.pipe(v.string(), v.url()),
	},
});
