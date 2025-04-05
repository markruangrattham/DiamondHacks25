/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/flashcards/route";
exports.ids = ["app/api/flashcards/route"];
exports.modules = {

/***/ "(rsc)/./app/api/flashcards/route.ts":
/*!*************************************!*\
  !*** ./app/api/flashcards/route.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ GET)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var _vercel_kv__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @vercel/kv */ \"(rsc)/./node_modules/@vercel/kv/dist/index.js\");\n\n\nasync function GET(request) {\n    try {\n        // Try to fetch from Vercel KV if available\n        let flashcardSets = [];\n        try {\n            if (typeof _vercel_kv__WEBPACK_IMPORTED_MODULE_1__.kv !== \"undefined\" && _vercel_kv__WEBPACK_IMPORTED_MODULE_1__.kv.keys && _vercel_kv__WEBPACK_IMPORTED_MODULE_1__.kv.mget) {\n                // Get all flashcard set keys\n                const keys = await _vercel_kv__WEBPACK_IMPORTED_MODULE_1__.kv.keys(\"flashcard:*\");\n                if (keys.length > 0) {\n                    // Fetch all flashcard sets\n                    const values = await _vercel_kv__WEBPACK_IMPORTED_MODULE_1__.kv.mget(...keys);\n                    // Map keys to values\n                    flashcardSets = keys.map((key, index)=>{\n                        const set = values[index];\n                        return set;\n                    }).filter(Boolean);\n                }\n            } else {\n                // Mock storage for development\n                console.log(\"KV storage not available, using mock storage\");\n                if (global.mockStorage) {\n                    flashcardSets = Object.values(global.mockStorage);\n                }\n            }\n        } catch (storageError) {\n            console.error(\"Error retrieving flashcard sets:\", storageError);\n        }\n        // If no flashcard sets found, return mock data for demo\n        if (flashcardSets.length === 0) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json([\n                {\n                    id: \"mock1\",\n                    title: \"Biology 101: Cell Structure\",\n                    subject: \"Biology\",\n                    createdAt: new Date().toISOString(),\n                    cardCount: 15,\n                    lastStudied: new Date().toISOString()\n                },\n                {\n                    id: \"mock2\",\n                    title: \"World History: Ancient Civilizations\",\n                    subject: \"History\",\n                    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),\n                    cardCount: 22,\n                    lastStudied: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()\n                }\n            ]);\n        }\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json(flashcardSets);\n    } catch (error) {\n        console.error(\"Error fetching flashcard sets:\", error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: \"Failed to fetch flashcard sets\"\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL2ZsYXNoY2FyZHMvcm91dGUudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQTREO0FBQzdCO0FBRXhCLGVBQWVFLElBQUlDLE9BQW9CO0lBQzVDLElBQUk7UUFDRiwyQ0FBMkM7UUFDM0MsSUFBSUMsZ0JBQWdCLEVBQUU7UUFFdEIsSUFBSTtZQUNGLElBQUksT0FBT0gsMENBQUVBLEtBQUssZUFBZUEsMENBQUVBLENBQUNJLElBQUksSUFBSUosMENBQUVBLENBQUNLLElBQUksRUFBRTtnQkFDbkQsNkJBQTZCO2dCQUM3QixNQUFNRCxPQUFPLE1BQU1KLDBDQUFFQSxDQUFDSSxJQUFJLENBQUM7Z0JBRTNCLElBQUlBLEtBQUtFLE1BQU0sR0FBRyxHQUFHO29CQUNuQiwyQkFBMkI7b0JBQzNCLE1BQU1DLFNBQVMsTUFBTVAsMENBQUVBLENBQUNLLElBQUksSUFBSUQ7b0JBRWhDLHFCQUFxQjtvQkFDckJELGdCQUFnQkMsS0FDYkksR0FBRyxDQUFDLENBQUNDLEtBQUtDO3dCQUNULE1BQU1DLE1BQU1KLE1BQU0sQ0FBQ0csTUFBTTt3QkFDekIsT0FBT0M7b0JBQ1QsR0FDQ0MsTUFBTSxDQUFDQztnQkFDWjtZQUNGLE9BQU87Z0JBQ0wsK0JBQStCO2dCQUMvQkMsUUFBUUMsR0FBRyxDQUFDO2dCQUNaLElBQUlDLE9BQU9DLFdBQVcsRUFBRTtvQkFDdEJkLGdCQUFnQmUsT0FBT1gsTUFBTSxDQUFDUyxPQUFPQyxXQUFXO2dCQUNsRDtZQUNGO1FBQ0YsRUFBRSxPQUFPRSxjQUFjO1lBQ3JCTCxRQUFRTSxLQUFLLENBQUMsb0NBQW9DRDtRQUNwRDtRQUVBLHdEQUF3RDtRQUN4RCxJQUFJaEIsY0FBY0csTUFBTSxLQUFLLEdBQUc7WUFDOUIsT0FBT1AscURBQVlBLENBQUNzQixJQUFJLENBQUM7Z0JBQ3ZCO29CQUNFQyxJQUFJO29CQUNKQyxPQUFPO29CQUNQQyxTQUFTO29CQUNUQyxXQUFXLElBQUlDLE9BQU9DLFdBQVc7b0JBQ2pDQyxXQUFXO29CQUNYQyxhQUFhLElBQUlILE9BQU9DLFdBQVc7Z0JBQ3JDO2dCQUNBO29CQUNFTCxJQUFJO29CQUNKQyxPQUFPO29CQUNQQyxTQUFTO29CQUNUQyxXQUFXLElBQUlDLEtBQUtBLEtBQUtJLEdBQUcsS0FBSyxJQUFJLEtBQUssS0FBSyxLQUFLLE1BQU1ILFdBQVc7b0JBQ3JFQyxXQUFXO29CQUNYQyxhQUFhLElBQUlILEtBQUtBLEtBQUtJLEdBQUcsS0FBSyxJQUFJLEtBQUssS0FBSyxLQUFLLE1BQU1ILFdBQVc7Z0JBQ3pFO2FBQ0Q7UUFDSDtRQUVBLE9BQU81QixxREFBWUEsQ0FBQ3NCLElBQUksQ0FBQ2xCO0lBQzNCLEVBQUUsT0FBT2lCLE9BQU87UUFDZE4sUUFBUU0sS0FBSyxDQUFDLGtDQUFrQ0E7UUFDaEQsT0FBT3JCLHFEQUFZQSxDQUFDc0IsSUFBSSxDQUFDO1lBQUVELE9BQU87UUFBaUMsR0FBRztZQUFFVyxRQUFRO1FBQUk7SUFDdEY7QUFDRiIsInNvdXJjZXMiOlsiQzpcXFVzZXJzXFxiaWczZFxcT25lRHJpdmVcXERlc2t0b3BcXGNvZGVzXFxEaWFtb25kSGFja3MyNVxcZnJvbnRlbmRcXGFwcFxcYXBpXFxmbGFzaGNhcmRzXFxyb3V0ZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyB0eXBlIE5leHRSZXF1ZXN0LCBOZXh0UmVzcG9uc2UgfSBmcm9tIFwibmV4dC9zZXJ2ZXJcIlxuaW1wb3J0IHsga3YgfSBmcm9tIFwiQHZlcmNlbC9rdlwiXG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBHRVQocmVxdWVzdDogTmV4dFJlcXVlc3QpIHtcbiAgdHJ5IHtcbiAgICAvLyBUcnkgdG8gZmV0Y2ggZnJvbSBWZXJjZWwgS1YgaWYgYXZhaWxhYmxlXG4gICAgbGV0IGZsYXNoY2FyZFNldHMgPSBbXVxuXG4gICAgdHJ5IHtcbiAgICAgIGlmICh0eXBlb2Yga3YgIT09IFwidW5kZWZpbmVkXCIgJiYga3Yua2V5cyAmJiBrdi5tZ2V0KSB7XG4gICAgICAgIC8vIEdldCBhbGwgZmxhc2hjYXJkIHNldCBrZXlzXG4gICAgICAgIGNvbnN0IGtleXMgPSBhd2FpdCBrdi5rZXlzKFwiZmxhc2hjYXJkOipcIilcblxuICAgICAgICBpZiAoa2V5cy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgLy8gRmV0Y2ggYWxsIGZsYXNoY2FyZCBzZXRzXG4gICAgICAgICAgY29uc3QgdmFsdWVzID0gYXdhaXQga3YubWdldCguLi5rZXlzKVxuXG4gICAgICAgICAgLy8gTWFwIGtleXMgdG8gdmFsdWVzXG4gICAgICAgICAgZmxhc2hjYXJkU2V0cyA9IGtleXNcbiAgICAgICAgICAgIC5tYXAoKGtleSwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgY29uc3Qgc2V0ID0gdmFsdWVzW2luZGV4XVxuICAgICAgICAgICAgICByZXR1cm4gc2V0XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmZpbHRlcihCb29sZWFuKVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBNb2NrIHN0b3JhZ2UgZm9yIGRldmVsb3BtZW50XG4gICAgICAgIGNvbnNvbGUubG9nKFwiS1Ygc3RvcmFnZSBub3QgYXZhaWxhYmxlLCB1c2luZyBtb2NrIHN0b3JhZ2VcIilcbiAgICAgICAgaWYgKGdsb2JhbC5tb2NrU3RvcmFnZSkge1xuICAgICAgICAgIGZsYXNoY2FyZFNldHMgPSBPYmplY3QudmFsdWVzKGdsb2JhbC5tb2NrU3RvcmFnZSlcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gY2F0Y2ggKHN0b3JhZ2VFcnJvcikge1xuICAgICAgY29uc29sZS5lcnJvcihcIkVycm9yIHJldHJpZXZpbmcgZmxhc2hjYXJkIHNldHM6XCIsIHN0b3JhZ2VFcnJvcilcbiAgICB9XG5cbiAgICAvLyBJZiBubyBmbGFzaGNhcmQgc2V0cyBmb3VuZCwgcmV0dXJuIG1vY2sgZGF0YSBmb3IgZGVtb1xuICAgIGlmIChmbGFzaGNhcmRTZXRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKFtcbiAgICAgICAge1xuICAgICAgICAgIGlkOiBcIm1vY2sxXCIsXG4gICAgICAgICAgdGl0bGU6IFwiQmlvbG9neSAxMDE6IENlbGwgU3RydWN0dXJlXCIsXG4gICAgICAgICAgc3ViamVjdDogXCJCaW9sb2d5XCIsXG4gICAgICAgICAgY3JlYXRlZEF0OiBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCksXG4gICAgICAgICAgY2FyZENvdW50OiAxNSxcbiAgICAgICAgICBsYXN0U3R1ZGllZDogbmV3IERhdGUoKS50b0lTT1N0cmluZygpLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgaWQ6IFwibW9jazJcIixcbiAgICAgICAgICB0aXRsZTogXCJXb3JsZCBIaXN0b3J5OiBBbmNpZW50IENpdmlsaXphdGlvbnNcIixcbiAgICAgICAgICBzdWJqZWN0OiBcIkhpc3RvcnlcIixcbiAgICAgICAgICBjcmVhdGVkQXQ6IG5ldyBEYXRlKERhdGUubm93KCkgLSAzICogMjQgKiA2MCAqIDYwICogMTAwMCkudG9JU09TdHJpbmcoKSxcbiAgICAgICAgICBjYXJkQ291bnQ6IDIyLFxuICAgICAgICAgIGxhc3RTdHVkaWVkOiBuZXcgRGF0ZShEYXRlLm5vdygpIC0gMiAqIDI0ICogNjAgKiA2MCAqIDEwMDApLnRvSVNPU3RyaW5nKCksXG4gICAgICAgIH0sXG4gICAgICBdKVxuICAgIH1cblxuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbihmbGFzaGNhcmRTZXRzKVxuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciBmZXRjaGluZyBmbGFzaGNhcmQgc2V0czpcIiwgZXJyb3IpXG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgZXJyb3I6IFwiRmFpbGVkIHRvIGZldGNoIGZsYXNoY2FyZCBzZXRzXCIgfSwgeyBzdGF0dXM6IDUwMCB9KVxuICB9XG59XG5cbiJdLCJuYW1lcyI6WyJOZXh0UmVzcG9uc2UiLCJrdiIsIkdFVCIsInJlcXVlc3QiLCJmbGFzaGNhcmRTZXRzIiwia2V5cyIsIm1nZXQiLCJsZW5ndGgiLCJ2YWx1ZXMiLCJtYXAiLCJrZXkiLCJpbmRleCIsInNldCIsImZpbHRlciIsIkJvb2xlYW4iLCJjb25zb2xlIiwibG9nIiwiZ2xvYmFsIiwibW9ja1N0b3JhZ2UiLCJPYmplY3QiLCJzdG9yYWdlRXJyb3IiLCJlcnJvciIsImpzb24iLCJpZCIsInRpdGxlIiwic3ViamVjdCIsImNyZWF0ZWRBdCIsIkRhdGUiLCJ0b0lTT1N0cmluZyIsImNhcmRDb3VudCIsImxhc3RTdHVkaWVkIiwibm93Iiwic3RhdHVzIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./app/api/flashcards/route.ts\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fflashcards%2Froute&page=%2Fapi%2Fflashcards%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fflashcards%2Froute.ts&appDir=C%3A%5CUsers%5Cbig3d%5COneDrive%5CDesktop%5Ccodes%5CDiamondHacks25%5Cfrontend%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cbig3d%5COneDrive%5CDesktop%5Ccodes%5CDiamondHacks25%5Cfrontend&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fflashcards%2Froute&page=%2Fapi%2Fflashcards%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fflashcards%2Froute.ts&appDir=C%3A%5CUsers%5Cbig3d%5COneDrive%5CDesktop%5Ccodes%5CDiamondHacks25%5Cfrontend%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cbig3d%5COneDrive%5CDesktop%5Ccodes%5CDiamondHacks25%5Cfrontend&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var C_Users_big3d_OneDrive_Desktop_codes_DiamondHacks25_frontend_app_api_flashcards_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/flashcards/route.ts */ \"(rsc)/./app/api/flashcards/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/flashcards/route\",\n        pathname: \"/api/flashcards\",\n        filename: \"route\",\n        bundlePath: \"app/api/flashcards/route\"\n    },\n    resolvedPagePath: \"C:\\\\Users\\\\big3d\\\\OneDrive\\\\Desktop\\\\codes\\\\DiamondHacks25\\\\frontend\\\\app\\\\api\\\\flashcards\\\\route.ts\",\n    nextConfigOutput,\n    userland: C_Users_big3d_OneDrive_Desktop_codes_DiamondHacks25_frontend_app_api_flashcards_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZmbGFzaGNhcmRzJTJGcm91dGUmcGFnZT0lMkZhcGklMkZmbGFzaGNhcmRzJTJGcm91dGUmYXBwUGF0aHM9JnBhZ2VQYXRoPXByaXZhdGUtbmV4dC1hcHAtZGlyJTJGYXBpJTJGZmxhc2hjYXJkcyUyRnJvdXRlLnRzJmFwcERpcj1DJTNBJTVDVXNlcnMlNUNiaWczZCU1Q09uZURyaXZlJTVDRGVza3RvcCU1Q2NvZGVzJTVDRGlhbW9uZEhhY2tzMjUlNUNmcm9udGVuZCU1Q2FwcCZwYWdlRXh0ZW5zaW9ucz10c3gmcGFnZUV4dGVuc2lvbnM9dHMmcGFnZUV4dGVuc2lvbnM9anN4JnBhZ2VFeHRlbnNpb25zPWpzJnJvb3REaXI9QyUzQSU1Q1VzZXJzJTVDYmlnM2QlNUNPbmVEcml2ZSU1Q0Rlc2t0b3AlNUNjb2RlcyU1Q0RpYW1vbmRIYWNrczI1JTVDZnJvbnRlbmQmaXNEZXY9dHJ1ZSZ0c2NvbmZpZ1BhdGg9dHNjb25maWcuanNvbiZiYXNlUGF0aD0mYXNzZXRQcmVmaXg9Jm5leHRDb25maWdPdXRwdXQ9JnByZWZlcnJlZFJlZ2lvbj0mbWlkZGxld2FyZUNvbmZpZz1lMzAlM0QhIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQStGO0FBQ3ZDO0FBQ3FCO0FBQ29EO0FBQ2pJO0FBQ0E7QUFDQTtBQUNBLHdCQUF3Qix5R0FBbUI7QUFDM0M7QUFDQSxjQUFjLGtFQUFTO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxZQUFZO0FBQ1osQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBLFFBQVEsc0RBQXNEO0FBQzlEO0FBQ0EsV0FBVyw0RUFBVztBQUN0QjtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQzBGOztBQUUxRiIsInNvdXJjZXMiOlsiIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFwcFJvdXRlUm91dGVNb2R1bGUgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9yb3V0ZS1tb2R1bGVzL2FwcC1yb3V0ZS9tb2R1bGUuY29tcGlsZWRcIjtcbmltcG9ydCB7IFJvdXRlS2luZCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL3JvdXRlLWtpbmRcIjtcbmltcG9ydCB7IHBhdGNoRmV0Y2ggYXMgX3BhdGNoRmV0Y2ggfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9saWIvcGF0Y2gtZmV0Y2hcIjtcbmltcG9ydCAqIGFzIHVzZXJsYW5kIGZyb20gXCJDOlxcXFxVc2Vyc1xcXFxiaWczZFxcXFxPbmVEcml2ZVxcXFxEZXNrdG9wXFxcXGNvZGVzXFxcXERpYW1vbmRIYWNrczI1XFxcXGZyb250ZW5kXFxcXGFwcFxcXFxhcGlcXFxcZmxhc2hjYXJkc1xcXFxyb3V0ZS50c1wiO1xuLy8gV2UgaW5qZWN0IHRoZSBuZXh0Q29uZmlnT3V0cHV0IGhlcmUgc28gdGhhdCB3ZSBjYW4gdXNlIHRoZW0gaW4gdGhlIHJvdXRlXG4vLyBtb2R1bGUuXG5jb25zdCBuZXh0Q29uZmlnT3V0cHV0ID0gXCJcIlxuY29uc3Qgcm91dGVNb2R1bGUgPSBuZXcgQXBwUm91dGVSb3V0ZU1vZHVsZSh7XG4gICAgZGVmaW5pdGlvbjoge1xuICAgICAgICBraW5kOiBSb3V0ZUtpbmQuQVBQX1JPVVRFLFxuICAgICAgICBwYWdlOiBcIi9hcGkvZmxhc2hjYXJkcy9yb3V0ZVwiLFxuICAgICAgICBwYXRobmFtZTogXCIvYXBpL2ZsYXNoY2FyZHNcIixcbiAgICAgICAgZmlsZW5hbWU6IFwicm91dGVcIixcbiAgICAgICAgYnVuZGxlUGF0aDogXCJhcHAvYXBpL2ZsYXNoY2FyZHMvcm91dGVcIlxuICAgIH0sXG4gICAgcmVzb2x2ZWRQYWdlUGF0aDogXCJDOlxcXFxVc2Vyc1xcXFxiaWczZFxcXFxPbmVEcml2ZVxcXFxEZXNrdG9wXFxcXGNvZGVzXFxcXERpYW1vbmRIYWNrczI1XFxcXGZyb250ZW5kXFxcXGFwcFxcXFxhcGlcXFxcZmxhc2hjYXJkc1xcXFxyb3V0ZS50c1wiLFxuICAgIG5leHRDb25maWdPdXRwdXQsXG4gICAgdXNlcmxhbmRcbn0pO1xuLy8gUHVsbCBvdXQgdGhlIGV4cG9ydHMgdGhhdCB3ZSBuZWVkIHRvIGV4cG9zZSBmcm9tIHRoZSBtb2R1bGUuIFRoaXMgc2hvdWxkXG4vLyBiZSBlbGltaW5hdGVkIHdoZW4gd2UndmUgbW92ZWQgdGhlIG90aGVyIHJvdXRlcyB0byB0aGUgbmV3IGZvcm1hdC4gVGhlc2Vcbi8vIGFyZSB1c2VkIHRvIGhvb2sgaW50byB0aGUgcm91dGUuXG5jb25zdCB7IHdvcmtBc3luY1N0b3JhZ2UsIHdvcmtVbml0QXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcyB9ID0gcm91dGVNb2R1bGU7XG5mdW5jdGlvbiBwYXRjaEZldGNoKCkge1xuICAgIHJldHVybiBfcGF0Y2hGZXRjaCh7XG4gICAgICAgIHdvcmtBc3luY1N0b3JhZ2UsXG4gICAgICAgIHdvcmtVbml0QXN5bmNTdG9yYWdlXG4gICAgfSk7XG59XG5leHBvcnQgeyByb3V0ZU1vZHVsZSwgd29ya0FzeW5jU3RvcmFnZSwgd29ya1VuaXRBc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzLCBwYXRjaEZldGNoLCAgfTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXBwLXJvdXRlLmpzLm1hcCJdLCJuYW1lcyI6W10sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fflashcards%2Froute&page=%2Fapi%2Fflashcards%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fflashcards%2Froute.ts&appDir=C%3A%5CUsers%5Cbig3d%5COneDrive%5CDesktop%5Ccodes%5CDiamondHacks25%5Cfrontend%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cbig3d%5COneDrive%5CDesktop%5Ccodes%5CDiamondHacks25%5Cfrontend&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "(ssr)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "../app-render/after-task-async-storage.external":
/*!***********************************************************************************!*\
  !*** external "next/dist/server/app-render/after-task-async-storage.external.js" ***!
  \***********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/after-task-async-storage.external.js");

/***/ }),

/***/ "../app-render/work-async-storage.external":
/*!*****************************************************************************!*\
  !*** external "next/dist/server/app-render/work-async-storage.external.js" ***!
  \*****************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-async-storage.external.js");

/***/ }),

/***/ "./work-unit-async-storage.external":
/*!**********************************************************************************!*\
  !*** external "next/dist/server/app-render/work-unit-async-storage.external.js" ***!
  \**********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("crypto");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/@opentelemetry","vendor-chunks/crypto-js","vendor-chunks/@upstash","vendor-chunks/@vercel"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fflashcards%2Froute&page=%2Fapi%2Fflashcards%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fflashcards%2Froute.ts&appDir=C%3A%5CUsers%5Cbig3d%5COneDrive%5CDesktop%5Ccodes%5CDiamondHacks25%5Cfrontend%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cbig3d%5COneDrive%5CDesktop%5Ccodes%5CDiamondHacks25%5Cfrontend&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();