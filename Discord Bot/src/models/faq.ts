import * as resourceLink from './resourceLink'

export interface faq {
    Description: string;
    Question: string;
    Answer: string;
    ResourceLink: resourceLink.resourceLink
}

export class faq implements faq {

}