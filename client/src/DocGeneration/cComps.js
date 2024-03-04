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

    static getCompfunctionals(funcs) {
        return new TableRow({
            children: [
                new TableCell({
                    children: [
                        //docData.LineBreak(),
                        this.getSubTitle("Compétences fonctionnelles :"),
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
                        this.getSubTitle("Compétences techniques :"),
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

    static getCompcles(docjs) {
        return new TableRow({
            children: [
                new TableCell({
                    children: [
                        docData.LineBreak(),
                        this.getSubTitle("Compétences fonctionnelles :"),
                        this.getComp(docjs.functionalAbilities),

                        docData.LineBreak(),
                        this.getSubTitle("Compétences techniques :"),
                        this.getComp(docjs.technicalAbilities),
                        alert("iam here3"),
                        docData.LineBreak(),
                        docData.getSubTitle("Langues"),
                        lang.getLangues(docjs.languages),

                        docData.LineBreak(),
                        docData.getSubTitle("Environnement"),
                        docData.LineBreak(),
                        docData.getLine2(docjs.skills.environments),


                        docData.LineBreak(),
                        docData.getSubTitle("Languages"),
                        docData.LineBreak(),
                        docData.getLine2(docjs.skills.languages),


                        docData.LineBreak(),
                        docData.getSubTitle("SGBD"),
                        docData.LineBreak(),
                        docData.getLine2(docjs.skills.databases),


                        docData.LineBreak(),
                        docData.getSubTitle("Outils"),
                        docData.LineBreak(),
                        docData.getLine2(docjs.skills.tools),

                        docData.LineBreak(),
                        docData.getSubTitle("Systèmes"),
                        docData.LineBreak(),
                        docData.getLine2(docjs.skills.systems),

                        docData.LineBreak(),
                        bref.getSubTitle("En bref"),
                        docData.LineBreak(),
                        docData.getLine2(docjs.bref),
                        docData.LineBreak(),
                        docData.pageBreak(),
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
        });

    }
    static getCompclesCellElements(docjs) {
        let compcell = new TableCell({
            children: [],
            columnSpan: 2,
            borders: {
                top: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
                bottom: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
                left: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
                right: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
            },
        })
        compcell.addChildElement(
            this.getTitle(),
            alert("iam here"),
            docData.LineBreak(),
            docData.LineBreak(),
            this.getSubTitle("Compétences fonctionnelles :"),
            this.getComp(docjs.functionalAbilities),
            alert("iam here2"),
            docData.LineBreak(),
            this.getSubTitle("Compétences techniques :"),
            this.getComp(docjs.technicalAbilities),
            alert("iam here3"),
            docData.LineBreak(),
            docData.getSubTitle("Langues"),
            lang.getLangues(docjs.languages),

            docData.LineBreak(),
            docData.getSubTitle("Environnement"),
            docData.LineBreak(),
            docData.getLine2(docjs.skills.environments),


            docData.LineBreak(),
            docData.getSubTitle("Languages"),
            docData.LineBreak(),
            docData.getLine2(docjs.skills.languages),


            docData.LineBreak(),
            docData.getSubTitle("SGBD"),
            docData.LineBreak(),
            docData.getLine2(docjs.skills.databases),


            docData.LineBreak(),
            docData.getSubTitle("Outils"),
            docData.LineBreak(),
            docData.getLine2(docjs.skills.tools),

            docData.LineBreak(),
            docData.getSubTitle("Systèmes"),
            docData.LineBreak(),
            docData.getLine2(docjs.skills.systems),

            docData.LineBreak(),
            bref.getSubTitle("En bref"),
            docData.LineBreak(),
            docData.getLine2(docjs.bref),
            docData.LineBreak(),
            docData.pageBreak(),
        );
        return compcell;

    }
    static getTitle() {
        return new Paragraph({
            children: [
                new ImageRun({
                    type: "png",
                    data: docData.urlToBlob(enumImg.Titlecomp),
                    transformation: {
                        width: 35,
                        height: 35,
                    },
                }),
                new TextRun({
                    children: [new Tab(), new Tab(), new Tab(), new Tab(), ""],
                }),
                new TextRun({
                    alignment: AlignmentType.CENTER,
                    text: "Compétences Clés",
                    font: "Century Gothic",
                    bold: true,
                    size: 28,
                }),
            ],
        });
    }

}
export default cComps;