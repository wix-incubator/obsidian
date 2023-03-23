import controllerDecoratedHasApiTags from "./controllerDecoratedHasApiTags/controllerDecoratedHasApiTags";
import definedDependencies from "./definedDependencies/definedDependencies";

const allRules = {
    "controllers-should-supply-api-tags": controllerDecoratedHasApiTags,
    "defined-dependencies": definedDependencies
    };

export default allRules;
