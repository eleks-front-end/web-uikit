((root, factory) => {
    const SETUP_CONFIG = {
        INIT_CLASSNAME: 'e-autocomplete'
    }

    let Search = factory({});

    root.Search = Search;

    Search.Component.autoInitialization(SETUP_CONFIG.INIT_CLASSNAME);

})(window, (Search) => {
    Search.VERSION = '0.0.1';

//COMPONENT
    class Component {
        constructor(options) {
            //default options
            this.el = document.body;
            this.template = null;
            //default options
            
            Utils.extend(this, options);
        }

        static autoInitialization(className) {
            let elements = [].slice.call(document.getElementsByClassName(className));

            elements.forEach((node) => {
                new Component(); //TODO: collect and pass all data attributes as options 
            });
        }

        render() {
            var interpreted = new TemplateInterpreter(this.template)
            this.el.appendChild(interpreted)
        }

        setTemplate() {
            
        }

        getTemplate() {

        }
    }

//UTILS
    class Utils {
        constructor() {
            throw new Error('Abstract Class! The instance shouldn\'t be created')
        }

        static extend(obj1, obj2) {
            for (var key in obj2) {
                if (!obj2.hasOwnProperty(key))
                    continue;

                obj1[key] = obj2[key];
            }
        }
        
        static clone(obj) {
            return obj;
        }
    }
    
    
//MODEL
    class Model {
        constructor(options) {
            this.attributes = {};
        }
        
        get(key){
           return Utils.clone(this.attributes[key]);
        }
        
        set(key, value) {
            this.attributes[key] = value;
        }
    }
    
//TEMPLATE 
    class Template {
        constructor(model) {
            this.model = model;
        }
        
        getTemplate() {
            return this.template;
        }
    }

//TEMPLATEINTERPRETER
    class TemplateInterpreter {
        constructor(template) {
            if (!(template instanceof Template))
                throw new Error('Not valid arguments');

            this.template = template;
        }

        getInterpreted() {
            let tpl = this.template.getTemplate(),
                vars = this.getTemplateVariebles();
            
            for (let key in vars) {
                let re = new RegExp("\{" + key + "\}", 'g');
                tpl = tpl.replace(re, vars[key]);
            };
            
            return tpl;
        }
        
        getTemplateVariebles(){
            return [];
        }
    }

    Search.Utils = Utils;
    Search.Component = Component;

    return Search;
});