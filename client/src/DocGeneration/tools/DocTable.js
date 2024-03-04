const FileSaver = require("file-saver");
import enumImg from "../../_helpers/enum-Img.js";
import exppro from "../../DocGeneration/cExpPro";
import expperso from "../../DocGeneration/cExpPerso";
import comp from "../../DocGeneration/cComps";
import certs from "../../DocGeneration/cCerts";
import bref from "../../DocGeneration/cBref";
import lang from "../../DocGeneration/cLang";
import system from "../../DocGeneration/cSystems.js";
import languages from "../../DocGeneration/cLanguages.js";
import tools from "../cTools.js";
import databases from "../../DocGeneration/cDatabases.js";
import environments from "../../DocGeneration/cEnvironments.js";
import tbrow from "./tableRow";
import {
    Header,
    ImageRun,
    AlignmentType,
    Document,
    HeadingLevel,
    Packer,
    Paragraph,
    Tab,
    TabStopPosition,
    TabStopType,
    TextRun,
    HorizontalPositionAlign,
    VerticalPositionAlign,
    ExternalHyperlink,
    PageNumber,
    FrameAnchorType,
    ShadingType,
    Hyperlink,
    Table,
    TableRow,
    TableCell,
    BorderStyle,
} from "docx";
import docData from "./DocData";

class DocTable {
    static getTable(docjs) {
        const table = new Table({
            rows: [
                new TableRow({
                    children: [
                        new TableCell({
                            children: [
                                this.getTitle(),
                                docData.LineBreak(),
                                /*docData.LineBreak(),
                                comp.getSubTitle("Compétences fonctionnelles :"),
                                comp.getComp(docjs.functionalAbilities),
                                docData.LineBreak(),
                                comp.getSubTitle("Compétences techniques :"),
                                comp.getComp(docjs.technicalAbilities),

                                docData.LineBreak(),
                                certs.getSubTitle("Diplômes / Certifications"),
                                docData.LineBreak(),
                                certs.getCerts(docjs.certifications),


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
                                docData.pageBreak(),*/
                            ],
                            columnSpan: 2,
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
        if (docjs.functionalAbilities != "" && docjs.functionalAbilities != null && docjs.functionalAbilities.length > 0) {
            table.addChildElement(comp.getCompfunctionals(docjs.functionalAbilities));
        }
        if (docjs.technicalAbilities != "" && docjs.technicalAbilities != null && docjs.technicalAbilities.length > 0) {
            table.addChildElement(comp.getComptechnicals(docjs.technicalAbilities));
        }

        if (docjs.skills.environments != "" && docjs.skills.environments != null && docjs.skills.environments.length > 0) {
            table.addChildElement(environments.getEnvironmentsTableRow(docjs.skills.environments));
            table.addChildElement(tbrow.getBlankTableRowFont5LineBreak());
        }
        if (docjs.skills.languages != "" && docjs.skills.languages != null && docjs.skills.languages.length > 0) {
            table.addChildElement(languages.getLanguagesTableRow(docjs.skills.languages));
            table.addChildElement(tbrow.getBlankTableRowFont5LineBreak());
        }
        if (docjs.skills.databases != "" && docjs.skills.databases != null && docjs.skills.databases.length > 0) {
            table.addChildElement(databases.getDatabasesTableRow(docjs.skills.databases));
            table.addChildElement(tbrow.getBlankTableRowFont5LineBreak());
        }
        if (docjs.skills.tools != "" && docjs.skills.tools != null && docjs.skills.tools.length > 0) {
            table.addChildElement(tools.getToolsTableRow(docjs.skills.tools));
            table.addChildElement(tbrow.getBlankTableRowFont5LineBreak());
        }
        if (docjs.skills.systems != "" && docjs.skills.systems != null && docjs.skills.systems.length > 0) {
            table.addChildElement(system.getSystemsTableRow(docjs.skills.systems));
            table.addChildElement(tbrow.getBlankTableRowFont5LineBreak());
        }
        if (docjs.languages != "" && docjs.languages != null && docjs.languages.length > 0) {
            table.addChildElement(lang.getLanguesTableRow(docjs.languages));
        }

        if (docjs.certifications != "" && docjs.certifications != null && docjs.certifications.length > 0) {
            table.addChildElement(tbrow.getBlankTableRowSingleLineBreak());
            table.addChildElement(certs.getCertsTitleTableRow());
            table.addChildElement(tbrow.getBlankTableRowSingleLineBreak());
            table.addChildElement(certs.getCertsTableRow(docjs.certifications));
        }

        if (docjs.bref != "" && docjs.bref != null && docjs.bref.length > 0) {
            table.addChildElement(tbrow.getBlankTableRowSingleLineBreak());
            table.addChildElement(bref.getBrefTitleTableRow());
            table.addChildElement(tbrow.getBlankTableRowSingleLineBreak());
            table.addChildElement(bref.getBrefTableRow(docjs.bref));
        }


        /* table.addChildElement(tbrow.getBlankTableRowPageBreak());

         table.addChildElement(tbrow.getExpTitle("Expériences professionnelles"));
         table.addChildElement(tbrow.getBlankTableRowDoubleLineBreak());
         let counterexp = 1;
         let nbtasks = 0;
         docjs.experiencesPro.forEach((element) => {
             if (counterexp % 2 == 0 && docjs.experiencesPro.length - 1 != counterexp) {
                 let count = nbtasks + element.tasks.length;
                 let nbRowBreaks = this.getNbRowBreak(count);
                 /*alert(
                     "nbtasks: " +
                     nbtasks +
                     " **** count: " +
                     count +
                     " **** nbRowBreaks: " +
                     nbRowBreaks +
                     " ***** counterexp: " +
                     counterexp
                 );*/
        /*for (let index = 0; index < nbRowBreaks; index++) {
                    table.addChildElement(tbrow.getBlankTableRowDoubleLineBreak());
                }
            }

            table.addChildElement(tbrow.getExpTableRow(element));
            table.addChildElement(tbrow.getBlankTableRowDoubleLineBreak());
            if (counterexp % 2 == 0 && docjs.experiencesPro.length - 1 != counterexp) {
                /*let count = nbtasks + element.tasks.length;
                        let nbRowBreaks = this.getNbRowBreak(count);
                        for (let index = 0; index < nbRowBreaks; index++) {
                            table.addChildElement(tbrow.getBlankTableRowDoubleLineBreak());
                        }*/
        /* table.addChildElement(tbrow.getBlankTableRowPageBreak());
                nbtasks = 0;
            } else {
                //if (!counterexp % 2 && docjs.experiencesPro.length - 1 != counterexp) {
                nbtasks = element.tasks.length;
                //}
            }
            counterexp++;
        });
        if (docjs.experiencesPro != "" && docjs.experiencesPro.length % 2 != 0) {
            table.addChildElement(tbrow.getBlankTableRowPageBreak());
        }
        counterexp = 0;
        if (docjs.projectsPerso != "" && docjs.projectsPerso != null) {
            for (let index = 0; index < docjs.projectsPerso.length; index++) {
                const element = docjs.projectsPerso[index];
                if (index == 0) {
                    //table.addChildElement(tbrow.getBlankTableRowPageBreak());
                    table.addChildElement(tbrow.getExpTitle("Expériences personnelles"));
                    table.addChildElement(tbrow.getBlankTableRowDoubleLineBreak());
                }
                table.addChildElement(tbrow.getProjectsTableRow(element));
                table.addChildElement(tbrow.getBlankTableRowDoubleLineBreak());
                if (counterexp % 2 && docjs.experiencesPro.length - 1 != counterexp) {
                    table.addChildElement(tbrow.getBlankTableRowPageBreak());
                }
                counterexp++;
            }
        }*/
        return table;
    }
    static getNbRowBreak(nb) {
        if (nb > 15) return 0;
        if (nb < 10) return 4;
        switch (nb) {
            case 15:
                return 1;
            case 14:
                return 2;
            case 13:
                return 3;
            case 12:
                return 3;
            case 11:
                return 3;
            case 10:
                return 3;
        }
    }
    static getTitleRow() {
        return new TableRow({
            children: [
                new TableCell({
                    children: [this.getTitle(), docData.LineBreak()],
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
                    children: [new Tab(), new Tab(), new Tab(), new Tab(), ""],
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

export default DocTable;