/**
 * @Project voting-backend
 * @author  junho.kim
 *
 * Created by Junho Kim (junho.kim@loplat.com) on 2017. 12. 25..
 */

module.exports = function(grunt) {
    "use strict";

    grunt.initConfig({
        ts: {
            app : {
                src: ["src/**/*.ts", "!src/.baseDir.ts"],
                dest: "./build",
                options: {
                    module: "commonjs",
                    noLib: true,
                    target: "es6",
                    sourceMap: false,
                    "types": [
                        "node"
                    ],
                    "typeRoots": [
                        "node_modules/@types"
                    ]
                }
            }
        },
        tslint: {
            options: {
                configuration: "tslint.json"
            },
            files: {
                src: ["src/**/*.ts"]
            }
        },
        watch: {
            ts: {
                files: ["src/**/*.ts"],
                tasks: ["ts", "tslint"]
            }
        }
    });

    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-ts");
    grunt.loadNpmTasks("grunt-tslint");

    grunt.registerTask("default", [
        "ts",
        "tslint"
    ]);
};
