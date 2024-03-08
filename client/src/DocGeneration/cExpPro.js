import {
    ImageRun,
    AlignmentType,
    HeadingLevel,
    Paragraph,
    Tab,
    TextRun,
    ExternalHyperlink,
    TableCell,
    Table,
    TableRow,
    WidthType,
    BorderStyle,
    HorizontalPositionAlign,
    HorizontalAlign,
} from "docx";
import enumImg from "../_helpers/enum-Img.js";
import docData from "./tools/DocData.js";
class cExpPro {
    static getSubTitle(txt) {
        return new Paragraph({
            children: [
                new ImageRun({
                    type: "png",
                    data: docData.urlToBlob(enumImg.TitleExp),
                    transformation: {
                        width: 60,
                        height: 60,
                    },
                }),
                new TextRun({
                    text: "       " + txt.trim(),
                    alignment: AlignmentType.TOP,
                    heading: HeadingLevel.TITLE,
                    font: "Century Gothic",
                    color: "#1d1933",
                    bold: true,
                    size: 28,
                }),
            ],
        });
    }
    static getExpEnt(ent) {
        return new Paragraph({
            children: [
                new TextRun({
                    text: ent.trim(),
                    alignment: AlignmentType.LEFT,
                    font: "Century Gothic",
                    //heading: HeadingLevel.TITLE,
                    bold: true,
                    //underline: true,
                    size: 22,
                    //color: "#008cba",
                }),
            ],
        });
    }
    static getExpPost(poste) {
        return new Paragraph({
            children: [
                new TextRun({
                    text: poste.trim(),
                    alignment: AlignmentType.LEFT,
                    heading: HeadingLevel.TITLE,
                    bold: true,
                    font: "Century Gothic",
                    //underline: true,
                    size: 20,
                    color: "#0c6164", //#055558", //#10b0b7", //#055029",
                }),
            ],
        });
    }
    static convertMonth(month) {
        switch (month) {
            case '01':
                return 'Janvier';
            case '02':
                return 'Février';
            case '03':
                return 'Mars';
            case '04':
                return 'Avril';
            case '05':
                return 'Mai';
            case '06':
                return 'Juin';
            case '07':
                return 'Juillet';
            case '08':
                return 'Août';
            case '09':
                return 'Septembre';
            case '10':
                return 'Octobre';
            case '11':
                return 'Novembre';
            case '12':
                return 'Décembre';
        }
        return month;
    }
    static getMonthAndYear(dt) {
        if (dt.length == 10) {
            return this.convertMonth(dt.substr(5, 2)) + " " + dt.substr(0, 4);
        }
        return dt;
    }
    static getExpPeriode(stdate, enddate) {
        let periode = "";
        if (stdate != "") {
            stdate = this.getMonthAndYear(stdate);
            if (enddate != "") {
                enddate = this.getMonthAndYear(enddate);
                periode = stdate + " à " + enddate;
            } else {
                periode = "Depuis " + stdate;
            }
            return new Paragraph({
                children: [
                    new TextRun({
                        text: periode,
                        alignment: AlignmentType.LEFT,
                        font: "Century Gothic",
                        size: 20,
                        color: "#0c6164",
                    }),
                ],
            });
        }
        return "";
    }
    static getExpEnvTechTitle(title) {
        return new Paragraph({
            children: [
                new TextRun({
                    text: title,
                    alignment: AlignmentType.LEFT,
                    heading: HeadingLevel.TITLE,
                    font: "Century Gothic",
                    //allCaps: true,

                    //bold: true,
                    //underline: true,
                    size: 20,
                    color: "#0c6164",
                }),
            ],
        });
    }
    static getExpEnvTech(ent) {
        return new Paragraph({
            children: [
                new TextRun({
                    text: ent.trim(),
                    alignment: AlignmentType.LEFT,
                    heading: HeadingLevel.TITLE,
                    font: "Century Gothic",
                    //smallCaps: true,
                    //bold: true,
                    //underline: true,
                    size: 20,
                    //color: "#008cba",
                }),
            ],
            spacing: {
                line: 250,
            },
        });
    }
    static getExpTask(task) {
        return new Table({
            rows: [
                new TableRow({
                    children: [
                        new TableCell({
                            children: [
                                new Paragraph({
                                    children: [docData.getBulletImg(enumImg.ExpProTask)],
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
                        }),
                        new TableCell({
                            children: [
                                new Paragraph({
                                    children: [
                                        new TextRun({
                                            text: task.trim(), //7 spaces,
                                            alignment: AlignmentType.LEFT,
                                            size: 20,
                                            font: "Century Gothic",
                                            // spacing: 10,
                                        }),
                                    ],
                                    spacing: {
                                        line: 300,
                                    },
                                }),
                            ],
                            borders: {
                                top: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
                                bottom: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
                                left: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
                                right: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
                            },
                            width: { size: 6000, type: WidthType.DXA },
                        }),
                    ],
                }),
            ],
        });
    }
    static getNblinesPro(exp, idx) {
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
        nbleftcollines += this.getExpPeriode(exp.start, exp.end).length > 31 ? 2 : 1;
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

}

export default cExpPro;