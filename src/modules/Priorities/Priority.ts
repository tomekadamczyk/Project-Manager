export const Property = (function() {
    function Property(this: any, id: number) {
        this.id = id;
    }
    
    Object.defineProperty(Property.prototype, "properties", {
        get: getProperties
    })

    return Property;
    
    function getProperties(this: any) {
        return this.id;
    }
})()



