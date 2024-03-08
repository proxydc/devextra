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
import { compareDesc } from 'date-fns';
import exppro from "./cExpPro";
class cBref {
    static getBrefTitleTableRow() {
        return new TableRow({
            children: [
                new TableCell({
                    children: [this.getTitle(), ],
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
    static getBrefTableRow(exp) {
        const tablecell = new TableCell({
            children: [],
            borders: {
                top: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
                bottom: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
                left: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
                right: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
            },
            //width: { size: 80, type: WidthType.PERCENTAGE },
        });
        if (exp != "" && exp != null && exp.length > 0) {
            tablecell.addChildElement(this.getEnt_Poste_NbExps(exp));
        }
        return tablecell;
        /*let tablerow = new TableRow({
            children: [
                new TableCell({
                    children: [new Paragraph({
                        children: [
                            new TextRun({
                                text: bref.trim(),
                                alignment: AlignmentType.LEFT,
                                font: "Century Gothic",
                                size: 20,
                            }),
                        ],
                        spacing: {
                            line: 350,
                        },
                    }), ],
                    columnSpan: 2,
                    borders: {
                        top: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
                        bottom: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
                        left: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
                        right: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
                    },
                })
            ],
        });
        return tablerow;*/
    }
    static getTitle() {
        return new Paragraph({
            children: [
                new ImageRun({
                    type: "png",
                    data: docData.urlToBlob(enumImg.Bref),
                    transformation: {
                        width: 40,
                        height: 40,
                    },
                }),
                new TextRun({
                    children: [new Tab(), new Tab(), new Tab(), new Tab(), new Tab(), ""],
                }),
                new TextRun({
                    alignment: AlignmentType.CENTER,
                    text: "En Bref",
                    font: "Century Gothic",
                    bold: true,
                    color: "#1d1933",
                    size: 28,
                }),
            ],
        });
    }
    static getBrefSingleRow(company, title, nbyrs) {
        return new TableRow({
            children: [
                new TableCell({
                    children: [
                        exppro.getExpPost(company),
                    ],
                    borders: {
                        top: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
                        bottom: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
                        left: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
                        right: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
                    },
                    width: { size: 45, type: WidthType.PERCENTAGE },
                }),
                new TableCell({
                    children: [
                        new Paragraph({
                            children: [new TextRun({
                                text: title.trim(),
                                alignment: AlignmentType.LEFT,
                                size: 20,
                                //bold: true,
                                font: "Century Gothic",
                            }), ],
                        }),
                    ],
                    borders: {
                        top: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
                        bottom: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
                        left: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
                        right: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
                    },
                    width: { size: 45, type: WidthType.PERCENTAGE },
                }),
                new TableCell({
                    children: [
                        new Paragraph({
                            children: [new TextRun({
                                text: nbyrs + " ans",
                                alignment: AlignmentType.LEFT,
                                size: 20,
                                //bold: true,
                                font: "Century Gothic",
                            }), ],
                        }),
                    ],
                    borders: {
                        top: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
                        bottom: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
                        left: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
                        right: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
                    },
                    width: { size: 10, type: WidthType.PERCENTAGE },
                }),
            ],
        });

    }
    static getEnt_Poste_NbExps(exp) {
        const breftable = new Table({
            rows: [
                new TableRow({
                    children: [
                        new TableCell({
                            children: [
                                docData.LineBreak(),
                            ],
                            columnSpan: 3,
                            borders: {
                                top: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
                                bottom: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
                                left: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
                                right: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
                            },
                        }),
                    ],
                }),
            ],
        });
        let temp = exp.sort(function(a, b) {
            let dateA = new Date(a.start);
            let dateB = new Date(b.start);
            return compareDesc(dateA - dateB);
        });
        let nbyears = 0;
        let days = 0;
        temp.forEach((element) => {
            days = this.getDiffDays(new Date(element.start),
                new Date(element.end))
            nbyears = Math.round(days / 365)
                //crete a table and add row
            breftable.addChildElement(this.getBrefSingleRow(element.company, element.title, nbyears));
        });
        // }
        return breftable;
    }
    static getDiffDays(startDate, endDate) {
        let ms = endDate.getTime() - startDate.getTime();
        return Math.round(ms / (1000 * 3600 * 24));
    }
}
export default cBref;