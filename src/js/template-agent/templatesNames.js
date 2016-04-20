import {plainText, imageText, titleText, custom, bySelector} from './templates';

/**
 * Constants for template names & template methods
 */
export default {
    IMAGE_TEXT: {
        name: 'imageText',
        tpl: imageText
    },
    PLAIN_TEXT: {
        name: 'plainText',
        tpl: plainText
    },
    TITLE_TEXT: {
        name: 'titleText',
        tpl: titleText
    },
    BY_SELECTOR: {
        name: 'bySelector',
        tpl: bySelector
    },
    CUSTOM: {
        tpl: custom
    }
};
