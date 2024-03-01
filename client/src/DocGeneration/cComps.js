import { Paragraph, TextRun, ImageRun, AlignmentType, HeadingLevel, Tab, } from "docx";
import enumImg from "../_helpers/enum-Img";
import docData from "./tools/DocData";
class cComps {
    static getComp(funcs) {
        const cf = new Paragraph({
            children: [],
        });
        cf.addChildElement(docData.LineBreakTR());
        for (var i = 0; i < funcs.length; i++) {
            cf.addChildElement(docData.getBulletImg(enumImg.Comp)); //bullet
            cf.addChildElement(
                new TextRun({
                    text: "       " + funcs[i], //7 spaces
                    alignment: AlignmentType.LEFT,
                    size: 22,
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
                    color: "#2a5a41",
                }),
            ],
        });
    }

}
export default cComps;