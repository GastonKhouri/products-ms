import "dotenv/config";
import * as joi from "joi";

interface EnvVars {
	PORT: number;
	DATABASE_URL: string;
}

const envsSchema = joi.object( {
	PORT: joi.number().default( 3000 ),
	DATABASE_URL: joi.string().required(),
} )
	.unknown();

const { error, value } = envsSchema.validate( process.env );

if ( error ) {
	throw new Error( `Config validation error: ${ error.message }` );
}

const envsVars: EnvVars = value;

export const envs = {
	port: envsVars.PORT,
	databaseUrl: envsVars.DATABASE_URL,
};