import {
    Paragraph,
    TextRun,
    ImageRun,
    AlignmentType,
    HeadingLevel,
    Tab,
    TableCell,
    TableRow,
    BorderStyle,
    WidthType,
    Table,
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
                    text: funcs[i].year + " : ",
                    size: 20,
                    bold: true,
                    font: "Century Gothic",
                })
            );
            cf.addChildElement(
                new TextRun({
                    children: [new Tab(), new Tab(), funcs[i].title],
                    alignment: AlignmentType.LEFT,
                    size: 20,
                    font: "Century Gothic",
                })
            );
            cf.addChildElement(docData.LineBreakTR());
        }
        return cf;
    }
    static getCertsTableRow(certs) {
        const tablecell = new TableCell({
            children: [],
            borders: {
                top: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
                bottom: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
                left: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
                right: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
            },
            width: { size: 68, type: WidthType.PERCENTAGE },
        });
        tablecell.addChildElement(this.getCerts(certs));
        /*certs.forEach(element => {
            tablecell.addChildElement(this.getCerts(element))
        });*/
        return tablecell;
    }
    static getCertsTitleTableRow() {
        return new TableRow({
            children: [
                new TableCell({
                    children: [this.getTitle("Diplômes / Certifications"), ],
                    columnSpan: 2,
                    borders: {
                        top: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
                        bottom: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
                        left: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
                        right: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
                    },
                }),
            ],
        });
    }
    static getTitle(txt) {
        return new Paragraph({
            children: [

                new TextRun({
                    children: [new Tab(), new Tab(), new Tab(), ""],
                }),
                new TextRun({
                    text: txt,
                    alignment: AlignmentType.CENTER,
                    heading: HeadingLevel.TITLE,
                    bold: true,
                    font: "Century Gothic",
                    color: "#12033f",
                    size: 28,

                }),
                new TextRun({
                    children: [new Tab(), new Tab(), new Tab(), new Tab(), ""],
                }),
                new ImageRun({
                    type: "png",
                    data: docData.urlToBlob(enumImg.Cert),
                    transformation: {
                        width: 55,
                        height: 55,
                    },
                }),
            ],
        });
    }
}
export default cCerts;