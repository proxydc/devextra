const FileSaver = require("file-saver");
//import enumImg from "../../_helpers/enum-Img.js";
//import { compareDesc } from 'date-fns'
import {
    ImageRun,
    AlignmentType,
    HeadingLevel,
    Paragraph,
    TextRun,
} from "docx";

class DocData {
    static getName(familyname, firstname, filename) {
        let name = firstname.trim() + " " + familyname.trim().toUpperCase();
        if (filename == 2) {
            name = firstname.trim().substr(0, 1).toUpperCase() + familyname.trim().substr(0, 2).toUpperCase();
        }
        return name;
    }
    static getFileName(name) {
        return new Date().getFullYear() + "" +
            this.getPadding(parseInt(new Date().getMonth() + 1) + "") +
            this.getPadding(new Date().getDate() + "") +
            " _ Profil de " + name +
            ".docx";

    }
    static getPadding(txt) {
            return txt.padStart(2, '0');
        }
        //no use
    static getYearDiffWithMonth(startDate, endDate) {
            const ms = endDate.getTime() - startDate.getTime();

            const date = new Date(ms);

            return Math.abs(date.getUTCFullYear() - 1970);
        }
        //no use
    static getDiffDays(startDate, endDate) {
        let ms = endDate.getTime() - startDate.getTime();
        return Math.round(ms / (1000 * 3600 * 24));
    }
    static getBulletImg(url) {
        return new ImageRun({
            type: "png",
            data: this.urlToBlob(url),
            transformation: {
                width: 5,
                height: 5,
            },
        });
    }
    static async urlToBlob(url) {
        return (await fetch(url)).blob();
    }
    static pageBreak(docjs) {
        var lines =
            docjs.functionalAbilities.length +
            docjs.technicalAbilities.length +
            docjs.certifications.length +
            docjs.languages.length;
        // alert("nblines: " + lines);
        if (lines < 14 && lines > 8) {
            return new Paragraph({
                text: "",
                pageBreakBefore: true,
            });
        }
        return "";
    }

    static pageBreak() {
            return new Paragraph({
                text: "",
                pageBreakBefore: true,
            });
        }
        //competences
    static getLine2(txt) {
        return new Paragraph({
            children: [
                new TextRun({
                    text: txt,
                    size: 22,
                    //bold: true,
                }),
            ],
        });
    }
    static LineBreakTR() {
        return new TextRun({
            text: "",
            break: 1,
        });
    }
    static LineBreak() {
        return new Paragraph({
            children: [
                new TextRun({
                    text: "",
                    //break: 1,
                }),
            ],
        });
    }
    static LineBreakFont5() {
        return new Paragraph({
            children: [
                new TextRun({
                    text: " ",
                    size: 10,
                    font: "Century Gothic",
                    //break: 1,
                }),
            ],
        });
    }
    static getSubTitle(txt) {
        return new Paragraph({
            children: [
                new TextRun({
                    text: txt,
                    alignment: AlignmentType.CENTER,
                    heading: HeadingLevel.TITLE,
                    bold: true,
                    font: "Century Gothic",
                    size: 20,
                    color: "#226c66", //#22636c", // "#09525c",
                }),
            ],
        });
    }
}

export default DocData;