export default {
	compileEnhancements: false,
	// babel: {
	// 	testOptions: {
	// 		plugins: [
	// 			[
	// 				"babel-plugin-webpack-alias-7",
	// 				{
	// 					config: ""
	// 				}
	// 			]
	// 		]
	// 	}
	// },
	extensions: ["ts"],
	files: ["**/*.test.ts"],
	sources: ["src/**/*"],
	require: ["esm", "ts-node/register"],
	verbose: true
};
