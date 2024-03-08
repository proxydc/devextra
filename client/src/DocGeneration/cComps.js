import { Paragraph, TextRun, ImageRun, AlignmentType, HeadingLevel, Tab, TableRow, TableCell, BorderStyle } from "docx";
import enumImg from "../_helpers/enum-Img";
import docData from "./tools/DocData";
import bref from "./cBref";
import lang from "./cLang";
class cComps {
    static getComp(funcs) {
        const cf = new Paragraph({
            children: [],
            spacing: {
                line: 250,
            },
        });
        cf.addChildElement(docData.LineBreakTR());
        for (var i = 0; i < funcs.length; i++) {
            cf.addChildElement(docData.getBulletImg(enumImg.Comp)); //bullet
            cf.addChildElement(
                new TextRun({
                    text: "       " + funcs[i], //7 spaces
                    alignment: AlignmentType.LEFT,
                    size: 20,
                    font: "Century Gothic",
                }));
            cf.addChildElement(docData.LineBreakTR());
        }
        return cf;
    }
    static getCompfunctionals(funcs) {
        return new TableRow({
            children: [
                new TableCell({
                    children: [
                        //docData.LineBreak(),
                        docData.getSubTitle("Compétences fonctionnelles :"),
                        this.getComp(funcs),
                    ],
                    columnSpan: 2,
                    borders: {
                        top: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
                        bottom: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
                        left: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
                        right: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
                    },
                })
            ],
        })
    }
    static getComptechnicals(techs) {
        return new TableRow({
            children: [
                new TableCell({
                    children: [
                        //docData.LineBreak(),
                        docData.getSubTitle("Compétences techniques :"),
                        this.getComp(techs),
                    ],
                    columnSpan: 2,
                    borders: {
                        top: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
                        bottom: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
                        left: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
                        right: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
                    },
                })
            ],
        })
    }
    static getTitle() {
        return new Paragraph({
            children: [
                new ImageRun({
                    type: "png",
                    data: docData.urlToBlob(enumImg.Titlecomp),
                    transformation: {
                        width: 40,
                        height: 40,
                    },
                }),
                new TextRun({
                    children: [new Tab(), new Tab(), new Tab(), new Tab(), "         "],
                }),
                new TextRun({
                    alignment: AlignmentType.CENTER,
                    text: "Compétences Clés",
                    font: "Century Gothic",
                    color: "#1d1933",
                    bold: true,
                    size: 28,
                }),
            ],
        });
    }
}
export default cComps;