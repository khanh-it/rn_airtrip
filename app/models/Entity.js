//

/**
 * @class Entity
 */
export default class Entity
{
    /**
     * 
     * @param {object} data 
     */
    constructor(data)
    {
        Object.assign(this, data || {});
    }
}