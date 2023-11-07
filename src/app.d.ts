// See https://kit.svelte.dev/docs/types#app

import type { Auth as MyAuth } from '$lib/server/auth';
import type { InferSQLSelectModel } from '$lib/server/database';
import type { User, UserSession } from '$lib/server/database/schema/auth';
import type { StrictOmit } from '$lib/utils';
import type { AuthRequest } from 'lucia';

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			auth: AuthRequest<MyAuth>;
		}
		// interface PageData {}
		// interface Platform {}
	}
	namespace Lucia {
		type Auth = MyAuth;
		type DatabaseUserAttributes = StrictOmit<InferSQLSelectModel<typeof User>, 'id'>;
		type DatabaseSessionAttributes = StrictOmit<
			InferSQLSelectModel<typeof UserSession>,
			'id' | 'active_expires' | 'idle_expires' | 'user_id'
		>;
	}
}

export {};
