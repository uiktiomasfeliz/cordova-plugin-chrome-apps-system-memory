// Type definitions for cordova-plugin-device
// Project: https://github.com/uiktiomasfeliz/cordova-plugin-system-memory
// Definitions by: Microsoft Open Technologies Inc <http://msopentech.com>
//                 Tim Brust <https://github.com/timbru31>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

/**
 * This plugin defines a global device object, which describes the device's memory.
 * Although the object is in the global scope, it is not available until after the deviceready event.
 */
interface SystemMemory {
    
    /** Indicates that Cordova initialize successfully. */
    available: boolean;
    
    /** Get the device's avaible system memory. */
    availableCapacity: string;   
    /** Get the device's total system memory. */
    capacity: string;    
}

declare var device: SystemMemory;
