
export function MyFunction() {

    #if MY_DIRECTIVE
        this.MySubFunction = () => {
            console.log("Hello, processed with MY_DIRECTIVE");
        }
    #else
        this.MySubFunction = () => {
            console.log("Hello");
        }
    #endif
    
    }