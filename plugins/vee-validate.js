import { configure, defineRule } from 'vee-validate'; // Import configure and defineRule functions
import rules from '@vee-validate/rules';

export default defineNuxtPlugin((nuxtApp) => {
    configure({
        validateOnInput: true,
    });

    // Loop through the rules and define them using defineRule
    Object.keys(rules).forEach((rule) => {
        defineRule(rule, rules[rule]);
    });

});