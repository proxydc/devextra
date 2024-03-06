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
    static getBrefTableRow(bref) {
        let tablerow = new TableRow({
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
        return tablerow;
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
                    children: [new Tab(), new Tab(), new Tab(), new Tab(), ""],
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
}
export default cBref;