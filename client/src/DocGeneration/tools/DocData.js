const FileSaver = require("file-saver");
import enumImg from "../../_helpers/enum-Img.js";
import { compareDesc } from 'date-fns'
import {
    Header,
    ImageRun,
    AlignmentType,
    HeadingLevel,
    Paragraph,
    Tab,
    TextRun,
    HorizontalPositionAlign,
    VerticalPositionAlign,
    ExternalHyperlink,
    PageNumber,
    ShadingType,
    Hyperlink,
    Footer,
} from "docx";

class DocData {
    static getFirstPageHeader(familyname, firstname, poste, nbexps) {
        return new Header({
            // The header on first page when the 'Different First Page' option is activated
            children: [
                this.getHeader(familyname, firstname, poste, nbexps),
                this.getHeaderLogo1stPage(),
                this.getHeaderGauche(),
            ],
        });
    }
    static getDefaultPageHeader() {
        return new Header({
            // The standard default header on every page or header on odd pages when the 'Different Odd & Even Pages' option is activated
            children: [
                this.getHeaderLogoDefault(),
            ],
        });
    }
    static getDefaultPageFooter() {
        return new Footer({
            // The standard default footer on every page or footer on odd pages when the 'Different Odd & Even Pages' option is activated
            children: [
                this.getFooterBG(),
                this.getFooterC(),
                this.LineBreak(),
                this.getPageNumber(),
            ],
        });
    }
    static getFirstPageFooter() {
        return new Footer({
            // The footer on first page when the 'Different First Page' option is activated
            children: [
                this.getFooterBG(),
                this.getFooterC(),
                this.LineBreak(),
                this.getPageNumber(),
            ],
        });
    }
    static getFooterBG() {
        return new Paragraph({
            children: [
                new ImageRun({
                    type: "png",
                    data: this.urlToBlob(enumImg.FooterBG),
                    transformation: {
                        width: 800,
                        height: 100,
                        /*position: absolute,
                                                            top: 0,
                                                            right: 0,*/
                    },
                    floating: {
                        behindDocument: true,
                        horizontalPosition: {
                            align: HorizontalPositionAlign.LEFT,
                        },
                        verticalPosition: {
                            align: VerticalPositionAlign.BOTTOM,
                        },
                    },
                }),
            ],
        });
    }
    static getYearDiffWithMonth(startDate, endDate) {
        const ms = endDate.getTime() - startDate.getTime();

        const date = new Date(ms);

        return Math.abs(date.getUTCFullYear() - 1970);
    }
    static getDiffDays(startDate, endDate) {
        let ms = endDate.getTime() - startDate.getTime();
        return Math.round(ms / (1000 * 3600 * 24));
    }
    static getPosteAndExps(poste, nbexps) {
        if (poste != "" && poste != null && poste.length > 0) {
            if (nbexps > 0)
                return poste + " (" + nbexps + " ans)";
            return poste;
        }
        return "";
    }
    static getHeader(familyname, firstname, poste, nbexps) {
        return new Paragraph({
            children: [
                new TextRun({
                    text: familyname + " " + firstname,
                    bold: true,
                    font: "Century Gothic",
                    size: 36,
                    color: "#e6f1eb",
                    alignment: AlignmentType.CENTER,
                }),
                new TextRun({
                    text: "",
                    break: 1,
                }),
                new TextRun({
                    text: this.getPosteAndExps(poste, nbexps),
                    bold: true,
                    font: "Century Gothic",
                    size: 24,
                    color: "#e6f1eb",
                    alignment: AlignmentType.CENTER,
                }),
            ],
            floating: {
                horizontalPosition: {
                    align: HorizontalPositionAlign.CENTER,
                },
                verticalPosition: {
                    align: VerticalPositionAlign.TOP,
                },
            },
        });
    }
    static getHeaderLogo1stPage() {
        return new Paragraph({
            children: [
                new ImageRun({
                    type: "png",
                    data: this.urlToBlob(enumImg.Logo2),
                    transformation: {
                        width: 180,
                        height: 85,
                    },

                    floating: {
                        horizontalPosition: {
                            align: HorizontalPositionAlign.RIGHT,
                        },
                        verticalPosition: {
                            align: VerticalPositionAlign.TOP,
                        },
                    },
                }),
            ],
        });
    }
    static getHeaderGauche() {
        return new Paragraph({
            children: [
                new ImageRun({
                    type: "png",
                    data: this.urlToBlob(enumImg.HeaderGauche),
                    transformation: {
                        width: 600,
                        height: 110,
                    },
                    floating: {
                        behindDocument: true,
                        horizontalPosition: {
                            align: HorizontalPositionAlign.LEFT,
                        },
                        verticalPosition: {
                            align: VerticalPositionAlign.TOP,
                        },
                    },
                }),
            ],
        });
    }
    static getHeaderLogoDefault() {
        return new Paragraph({
            children: [
                new ImageRun({
                    type: "png",
                    data: this.urlToBlob(enumImg.Logo1),
                    transformation: {
                        width: 75,
                        height: 105,
                    },

                    floating: {
                        horizontalPosition: {
                            align: HorizontalPositionAlign.RIGHT,
                        },
                        verticalPosition: {
                            align: VerticalPositionAlign.TOP,
                        },
                    },
                }),
            ],
            /* spacing: {
                 before: 100,
                 after: 100,
             }*/
        });
    }
    static getPageNumber() {
        return new Paragraph({
            children: [
                new TextRun({
                    children: [
                        "Page ",
                        PageNumber.CURRENT,
                        " of ",
                        PageNumber.TOTAL_PAGES,
                    ],
                }),
            ],
            alignment: AlignmentType.RIGHT,
        });
    }
    static getFooterC() {
        return new Paragraph({
            children: [
                new ExternalHyperlink({
                    children: [
                        new TextRun({
                            text: "Proxiad Est                                                                                                                                 www.proxiad.com",
                            bold: true,
                            style: Hyperlink,
                        }),
                    ],
                    link: "http://www.proxiad.com",
                }),
            ],
        });
    }
    static getFooterL() {
        return new Paragraph({
            children: [
                new TextRun({
                    text: "Proxiad Est",
                    bold: true,
                }),
            ],
            alignment: AlignmentType.LEFT,
        });
    }
    static getFooterR() {
        return new Paragraph({
            children: [
                new TextRun({
                    text: "E : (commercial (e)",
                    bold: true,
                    break: 1,
                }),
                new TextRun({
                    text: "www.proxiad.com",
                    bold: true,
                }),
            ],
            alignment: AlignmentType.RIGHT,
        });
    }
    static getBulletImg(url) {
        return new ImageRun({
            type: "png",
            data: this.urlToBlob(url),
            transformation: {
                width: 5,
                height: 5,
            },
        });
    }
    static getBulletImgExp(url) {
        return new ImageRun({
            type: "png",
            data: this.urlToBlob(url),
            transformation: {
                width: 15,
                height: 15,
            },
        });
    }
    static async urlToBlob(url) {
        return (await fetch(url)).blob();
    }
    static pageBreak(docjs) {
        var lines =
            docjs.functionalAbilities.length +
            docjs.technicalAbilities.length +
            docjs.certifications.length +
            docjs.languages.length;
        // alert("nblines: " + lines);
        if (lines < 14 && lines > 8) {
            return new Paragraph({
                text: "",
                pageBreakBefore: true,
            });
        }
        return "";
    }

    static pageBreak() {
        return new Paragraph({
            text: "",
            pageBreakBefore: true,
        });
    }

    static getLine(col, text) {
        return new Paragraph({
            children: [
                new TextRun({
                    text: col,
                    bold: true,
                    size: 30,
                }),
                new TextRun({
                    children: [new Tab(), text],
                    size: 28,
                }),
            ],
        });
    }
    static getTitle() {
        return new Paragraph({
            alignment: AlignmentType.CENTER,
            text: "Dossier de compétences",
            heading: HeadingLevel.TITLE,
        });
    }
    static getLine2(txt) {
        return new Paragraph({
            children: [
                new TextRun({
                    text: txt,
                    size: 22,
                    //bold: true,
                }),
            ],
        });
    }
    static getLineBreak() {
        new Paragraph({
            children: [], // Just newline without text
        });
    }
    static LineBreakTR() {
        return new TextRun({
            text: "",
            break: 1,
        });
    }
    static GetBlankBorder() {
        return 'top: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" }, bottom: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" }, left: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" }, right: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },';
    }
    static LineBreak() {
        return new Paragraph({
            children: [
                new TextRun({
                    text: "",
                    //break: 1,
                }),
            ],
        });
    }
    static LineBreakFont5() {
        return new Paragraph({
            children: [
                new TextRun({
                    text: " ",
                    size: 10,
                    font: "Century Gothic",
                    //break: 1,
                }),
            ],
        });
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

    static getHyperLink(txt, urllink) {
            return new Paragraph({
                children: [
                    new ExternalHyperlink({
                        children: [
                            new TextRun({
                                text: txt,
                                style: "Hyperlink",
                            }),
                        ],
                        link: urllink,
                    }),
                ],
            });
        }
        /*static getBulletPoint(txt, lvl) {
                            return new Paragraph({
                              text: txt,
                              bullet: {
                                level: lvl, // How deep you want the bullet to be. Maximum level is 9
                              },
                            });
                          }*/
    static getSubTitle1(txt) {
        return new TextRun({
            text: txt,
            alignment: AlignmentType.CENTER,
            heading: HeadingLevel.TITLE,
            bold: true,
            underline: true,
            size: 26,
            color: "#008cba",
        });
    }
    static getSubTitle2(txt) {
        return new TextRun({
            text: txt,
            alignment: AlignmentType.LEFT,
            heading: HeadingLevel.TITLE,
            bold: true,
            underline: true,
            size: 22,
            color: "#008cba",
        });
    }
}

export default DocData;