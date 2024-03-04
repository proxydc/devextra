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
import enumImg from "../_helpers/enum-Img";
import docData from "./tools/DocData";
class cLang {
    static getLangues(funcs) {
        const cf = new Paragraph({
            children: [],
        });
        cf.addChildElement(docData.LineBreakTR());
        for (var i = 0; i < funcs.length; i++) {
            cf.addChildElement(docData.getBulletImg(enumImg.Langues)); //bullet
            cf.addChildElement(
                new TextRun({
                    text: "       " + funcs[i], //7 spaces
                    alignment: AlignmentType.LEFT,
                    size: 22,
                })
            );
            cf.addChildElement(docData.LineBreakTR());
        }
        return cf;
    }
    static getLanguesTableRow(langs) {
        let tablerow = new TableRow({
            children: [
                new TableCell({
                    children: [
                        docData.getSubTitle("Langues :"),
                    ],
                    borders: {
                        top: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
                        bottom: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
                        left: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
                        right: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
                    },
                    width: { size: 32, type: WidthType.PERCENTAGE },
                }),
            ],
        });
        tablerow.addChildElement(this.getLanguesTableCell(langs));
        return tablerow;
    }
    static getLanguesTableCell(langs) {
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
        langs.forEach(element => {
            tablecell.addChildElement(this.getLang(element))
        });
        return tablecell;
    }
    static getLang(elem) {
        return new Table({
            rows: [
                new TableRow({
                    children: [
                        /*new TableCell({
                            children: [
                                new Paragraph({
                                    children: [docData.getBulletImg(enumImg.Langues)],
                                    alignment: AlignmentType.CENTER,
                                }),
                            ],
                            borders: {
                                top: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
                                bottom: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
                                left: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
                                right: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
                            },
                            width: { size: 400, type: WidthType.DXA },
                        }),*/
                        new TableCell({
                            children: [
                                new Paragraph({
                                    children: [
                                        new TextRun({
                                            text: elem.trim(),
                                            alignment: AlignmentType.LEFT,
                                            font: "Century Gothic",
                                            size: 20,
                                        }),
                                    ],
                                    spacing: {
                                        line: 250,
                                    },
                                }),
                            ],
                            borders: {
                                top: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
                                bottom: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
                                left: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
                                right: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
                            },
                            //width: { size: 6000, type: WidthType.DXA },
                        }),
                    ],
                }),
            ],
        });
    }
}
export default cLang;