import {
    ImageRun,
    AlignmentType,
    HeadingLevel,
    Paragraph,
    Tab,
    TextRun,
    ExternalHyperlink,
} from "docx";
import enumImg from "../_helpers/enum-Img.js";
import docData from "./tools/DocData";
class cExpPerso {
    static getNblinesPerso(exp, idx) {
        let nblines = 0;
        let nbleftcollines = 0;
        let nbrightcollines = 0;
        //for first page title
        if (idx == 0) { nblines += 2; }
        //for entreprise
        nblines += 1;
        //for space line
        nblines += 1;
        //******* LEFT COLUMNS LINES ******** */
        //for poste
        nbleftcollines += exp.title.length > 25 ? 2 : 1;
        //for period
        nbleftcollines += this.getExpPeriode(exp.period).length > 31 ? 2 : 1;
        //for environnment technique title
        nbleftcollines += 1;
        //for environnment context
        nbleftcollines += Math.ceil(exp.technical_env.length / 25);
        //for space lines
        nbleftcollines += 1;
        //******* RIGHT COLUMNS LINES ******** */
        nbrightcollines += Math.ceil(exp.context.length / 65);
        exp.tasks.forEach(element => {
            nbrightcollines += element.length > 64 ? 2 : 1;
        });
        if (nbleftcollines > nbrightcollines) { nblines += nbleftcollines; } else { nblines += nbrightcollines; }
        return nblines;
    }
    static getExpPeriode(per) {
        if (per != "" && per != null) {
            return new Paragraph({
                children: [
                    new TextRun({
                        text: per,
                        alignment: AlignmentType.LEFT,
                        font: "Century Gothic",
                        size: 20,
                        color: "#0c6164",
                    }),
                ],
            });
        }
        return "";
    }
}

export default cExpPerso;