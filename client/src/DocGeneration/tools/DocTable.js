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

        if (docjs.experiencesPro != "" && docjs.experiencesPro != null && docjs.experiencesPro.length > 0) {
            table.addChildElement(tbrow.getBlankTableRowPageBreak());
            table.addChildElement(tbrow.getExpTitle("Principales Expériences Professionnelles"));
            table.addChildElement(tbrow.getBlankTableRowDoubleLineBreak());
            let nblines = 0;
            // let nbleftcollines = 0;
            //let nbrightcollines = 0;
            //let expperpages = [];
            let linesperpages = [];
            let page = 0;
            let nbexps = 0;
            let nblinesaffectedsurpage = 0;
            let exppros = [];
            for (let index = 0; index < docjs.experiencesPro.length; index++) {
                nbexps += 1;
                /*//for first page title
                 if (index == 0) { nblines += 2; }
                 //for entreprise
                 nblines += 1;
                 //for space line
                 nblines += 1;
                 // LEFT COLUMNS LINES /
                //for poste
                 nbleftcollines += docjs.experiencesPro[index].title.length > 25 ? 2 : 1;
                 //for period
                 nbleftcollines += exppro.getExpPeriode(docjs.experiencesPro[index].start, docjs.experiencesPro[index].end).length > 31 ? 2 : 1;
                 //for environnment technique title
                 nbleftcollines += 1;
                 //for environnment context
                 nbleftcollines += Math.ceil(docjs.experiencesPro[index].technical_env.length / 25);
                 //for space lines
                 nbleftcollines += 1;
                 // RIGHT COLUMNS LINES /
                nbrightcollines += Math.ceil(docjs.experiencesPro[index].context.length / 65);
                docjs.experiencesPro[index].tasks.forEach(element => {
                    nbrightcollines += element.length > 64 ? 2 : 1;
                });

                if (nbleftcollines > nbrightcollines) { nblines += nbleftcollines; } else { nblines += nbrightcollines; }*/

                nblines += this.getNblines(docjs.experiencesPro[index], index);
                let lens = docjs.experiencesPro.length - 1;
                //alert("index: " + index + "****  length: " + lens + "****  nblines: " + nblines);
                if (nblines > 40 || index == lens) {
                    // alert("Iam here: " + index);
                    if (index == lens && nblines < 41) {
                        nblinesaffectedsurpage = nblines;
                    }
                    nbexps -= 1;
                    if (nbexps == 0) {
                        nbexps = 1;
                        exppros.push(docjs.experiencesPro[index]);
                    }
                    page += 1;
                    // expperpages.push({ num: page, exp: nbexps });
                    //alert("page: " + page);
                    //alert("nbexps: " + nbexps);                    
                    //alert("pages: " + pages);
                    //console.log("Pages: " + expperpages);

                    linesperpages.push({ num: page, nblinespage: nblinesaffectedsurpage, profexp: exppros });
                    let temp = 0;
                    linesperpages.forEach(element => {
                        temp += element.profexp.length;
                    });
                    let compare = index + 1;
                    if (temp != compare) {
                        index -= 1;
                    }
                    nblines = 0;
                    nbexps = 0;
                    exppros = [];
                    // if (index != lens) { index -= 1; }
                } else {
                    nblinesaffectedsurpage = nblines;
                    exppros.push(docjs.experiencesPro[index]);
                }
                //nbleftcollines = 0;
                //nbrightcollines = 0;
            }
            /*for (let k = 0; k < linesperpages.length; k++) {
                alert("Page num: " + linesperpages[k].num);
                alert("nblinespage: " + linesperpages[k].nblinespage);
                alert("Nb exps pour ce page: " + linesperpages[k].profexp.length);
            }*/
            linesperpages.forEach(function(element, idx, array) {
                element.profexp.forEach(element => {
                    table.addChildElement(tbrow.getExpPosteTitle(element.company));
                    table.addChildElement(tbrow.getBlankTableRowFont5LineBreak());
                    table.addChildElement(tbrow.getExpTableRow(element));
                    table.addChildElement(tbrow.getBlankTableRowDoubleLineBreak());
                });
                if (idx != array.length - 1) {
                    table.addChildElement(tbrow.getBlankTableRowPageBreak());
                }
            });

            //exp personnelles
            nblines = 0;
            linesperpages = [];
            page = 0;
            nbexps = 0;
            nblinesaffectedsurpage = 0;
            exppros = [];
            if (docjs.projectsPerso != "" && docjs.projectsPerso != null && docjs.projectsPerso.length > 0) {
                table.addChildElement(tbrow.getBlankTableRowPageBreak());
                table.addChildElement(tbrow.getExpTitle("Principales Expériences Personnelles"));
                table.addChildElement(tbrow.getBlankTableRowDoubleLineBreak());
                for (let index = 0; index < docjs.projectsPerso.length; index++) {
                    nbexps += 1;
                    nblines += this.getNblinesPerso(docjs.projectsPerso[index], index);
                    let lens = docjs.projectsPerso.length - 1;
                    if (nblines > 40 || index == lens) {
                        // alert("Iam here: " + index);
                        if (index == lens && nblines < 41) {
                            nblinesaffectedsurpage = nblines;
                        }
                        nbexps -= 1;
                        if (nbexps == 0) {
                            nbexps = 1;
                            exppros.push(docjs.projectsPerso[index]);
                        }
                        page += 1;
                        linesperpages.push({ num: page, nblinespage: nblinesaffectedsurpage, profexp: exppros });
                        let temp = 0;
                        linesperpages.forEach(element => {
                            temp += element.profexp.length;
                        });
                        let compare = index + 1;
                        if (temp != compare) {
                            index -= 1;
                        }
                        nblines = 0;
                        nbexps = 0;
                        exppros = [];
                    } else {
                        nblinesaffectedsurpage = nblines;
                        exppros.push(docjs.projectsPerso[index]);
                    }
                }
                /*for (let k = 0; k < linesperpages.length; k++) {
                    alert("Page num: " + linesperpages[k].num);
                    alert("nblinespage: " + linesperpages[k].nblinespage);
                    alert("Nb exps pour ce page: " + linesperpages[k].profexp.length);
                }*/
                linesperpages.forEach(function(element, idx, array) {
                    element.profexp.forEach(element => {
                        table.addChildElement(tbrow.getProjectsTableRow(element));
                        table.addChildElement(tbrow.getBlankTableRowDoubleLineBreak());
                    });
                    if (idx != array.length - 1) {
                        table.addChildElement(tbrow.getBlankTableRowPageBreak());
                    }
                });
            }
        }
        return table;
    }
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
        nbleftcollines += exppro.getExpPeriode(exp.period, '').length > 31 ? 2 : 1;
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
    static getNblines(exp, idx) {
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
        nbleftcollines += exppro.getExpPeriode(exp.start, exp.end).length > 31 ? 2 : 1;
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