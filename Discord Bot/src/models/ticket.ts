import * as applicant from './applicant'

export interface ticket {
    Description: string;
    Subject: string;
    Applicant: applicant.applicant
}

export class ticket implements ticket {

}