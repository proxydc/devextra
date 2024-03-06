import {
    TableRow,
    TableCell,
    BorderStyle,
    WidthType,
} from "docx";
import docData from "./DocData";
import exppro from "../../DocGeneration/cExpPro";
import expperso from "../../DocGeneration/cExpPerso";
class tableRow {
    static getBlankTableRowDoubleLineBreak() {
        return new TableRow({
            children: [
                new TableCell({
                    children: [docData.LineBreak(), docData.LineBreak(), ],
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
    static getBlankTableRowSingleLineBreak() {
        return new TableRow({
            children: [
                new TableCell({
                    children: [docData.LineBreak()],
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
    static getBlankTableRowFont5LineBreak() {
        return new TableRow({
            children: [
                new TableCell({
                    children: [docData.LineBreakFont5()],
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
    static getBlankTableRowPageBreak() {
        return new TableRow({
            children: [
                new TableCell({
                    children: [docData.pageBreak()],
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
    static getExpTitle(txt) {
        return new TableRow({
            children: [
                new TableCell({
                    children: [exppro.getSubTitle(txt)],
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
    static getExpPosteTitle(txt) {
        return new TableRow({
            children: [
                new TableCell({
                    children: [exppro.getExpEnt(txt)],
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
    static getExpTasksTableCell(tasks) {
        const tablecell = new TableCell({
            children: [],
            borders: {
                top: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
                bottom: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
                left: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
                right: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
            },
            width: { size: 68, type: WidthType.PERCENTAGE },
        });
        tasks.forEach(element => {
            tablecell.addChildElement(exppro.getExpTask(element))
                //tablecell.addChildElement(docData.LineBreak())
        });
        return tablecell;
    }
    static getExpTableRow(pros) {
        let tablerow = new TableRow({
            children: [
                new TableCell({
                    children: [
                        /*exppro.getExpEnt(pros.company),
                        docData.LineBreak(),*/
                        exppro.getExpPost(pros.title),
                        docData.LineBreak(),
                        exppro.getExpPeriode(pros.start, pros.end),
                        docData.LineBreak(),
                        exppro.getExpEnvTechTitle("Environnement technique : "),
                        docData.LineBreak(),
                        exppro.getExpEnvTech(pros.technical_env),
                        docData.LineBreak(),
                        docData.LineBreak(),
                    ],
                    borders: {
                        top: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
                        bottom: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
                        left: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
                        right: {
                            space: 10,
                            style: BorderStyle.SINGLE, //THREE_D_EMBOSS,
                            size: 3,
                            color: "#10b0b7",
                        },
                    },
                    width: { size: 32, type: WidthType.PERCENTAGE },
                }),
            ],
        });
        tablerow.addChildElement(this.getExpTasksTableCell(pros.tasks));
        return tablerow;
    }
    static getProjectsTableRow(pros) {
        let tablerow = new TableRow({
            children: [
                new TableCell({
                    children: [
                        exppro.getExpPost(pros.title),
                        docData.LineBreak(),
                        expperso.getExpPeriode(pros.period),
                        docData.LineBreak(),
                        exppro.getExpEnvTechTitle("Environnement technique : "),
                        docData.LineBreak(),
                        exppro.getExpEnvTech(pros.technical_env),
                        docData.LineBreak(),
                        docData.LineBreak(),
                    ],
                    borders: {
                        top: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
                        bottom: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
                        left: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
                        right: {
                            space: 10,
                            style: BorderStyle.SINGLE, //THREE_D_EMBOSS,
                            size: 2,
                            color: "#10b0b7",
                        },
                    },
                    width: { size: 32, type: WidthType.PERCENTAGE },
                }),
            ],
        });
        tablerow.addChildElement(this.getExpTasksTableCell(pros.tasks));
        return tablerow;
    }
}
export default tableRow;