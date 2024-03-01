import {
    Paragraph,
    TextRun,
    ImageRun,
    AlignmentType,
    HeadingLevel,
    Tab,
} from "docx";
import enumImg from "../_helpers/enum-Img.js";
import docData from "./tools/DocData";
class cCerts {
    static getCerts(funcs) {
        const cf = new Paragraph({
            children: [],
        });
        for (var i = 0; i < funcs.length; i++) {
            cf.addChildElement(
                new TextRun({
                    text: funcs[i].year + ": ",
                    size: 24,
                    bold: true,
                })
            );
            cf.addChildElement(
                new TextRun({
                    children: [new Tab(), new Tab(), funcs[i].title],
                    alignment: AlignmentType.LEFT,
                    size: 22,
                })
            );
            cf.addChildElement(docData.LineBreakTR());
        }
        return cf;
    }
    static getSubTitle(txt) {
        return new Paragraph({
            children: [

                new TextRun({
                    children: [new Tab(), new Tab(), new Tab(), new Tab(), ""],
                }),
                new TextRun({
                    text: txt,
                    alignment: AlignmentType.CENTER,
                    heading: HeadingLevel.TITLE,
                    bold: true,
                    bold: true,
                    font: "Century Gothic",
                    size: 28,

                }),
                new TextRun({
                    children: [new Tab(), new Tab(), ""],
                }),
                new ImageRun({
                    type: "png",
                    data: docData.urlToBlob(enumImg.Cert),
                    transformation: {
                        width: 60,
                        height: 60,
                    },
                }),
            ],
        });
    }
}
export default cCerts;