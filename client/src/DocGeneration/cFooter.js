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
import docData from "./tools/DocData";
import enumImg from "../_helpers/enum-Img.js";
class cFooter {
    static getDefaultPageFooter() {
        return new Footer({
            // The standard default footer on every page or footer on odd pages when the 'Different Odd & Even Pages' option is activated
            children: [
                this.getFooterBG(),
                //docData.LineBreak(),
                this.getFooterC(),
                // this.getPageNumber(),
            ],
        });
    }
    static getFirstPageFooter() {
        return new Footer({
            // The footer on first page when the 'Different First Page' option is activated
            children: [
                this.getFooterBG(),
                //docData.LineBreak(),
                this.getFooterC(),

                // this.getPageNumber(),
            ],
        });
    }
    static getFooterBG() {
        return new Paragraph({
            children: [
                new ImageRun({
                    type: "png",
                    data: docData.urlToBlob(enumImg.FooterBG),
                    transformation: {
                        width: 800,
                        height: 100,
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
                            text: "Proxiad Est                                                                                                             www.proxiad.com",
                            bold: true,
                            style: Hyperlink,
                            font: "Century Gothic",
                            size: 20,
                        }),
                    ],
                    link: "http://www.proxiad.com",
                }),
            ],
        });
    }

}

export default cFooter;