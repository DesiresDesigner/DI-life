/**
 * How to use:
 * getAllSpecies().then(species => {
 *     ...do something with species ...
 * })
 * @returns {Promise.<T>|*} a promise with species
 */
function getAllSpecies() {
    return fetch('/species').then(data => data.json());
}