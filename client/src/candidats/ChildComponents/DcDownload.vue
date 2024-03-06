<template>
  <div class="hello">
    <div class="example ex1">
            <h5>File Name</h5>
            <label class="radio red">
              <input type="radio" v-model="filename" value="1" name="group1" />
              <span>Complet</span>
            </label>
            <label class="radio blue">
              <input type="radio" v-model="filename" value="2" name="group1" checked />
              <span>Trigram</span>
            </label>
          </div>
    <button class="btn" v-on:click="createDoc(documentId)">
      DOWNLOAD DOCUMENT
    </button>
  </div>
</template>
<script>
import { Document, Packer } from "docx";
import docData from "../../DocGeneration/tools/DocData";
import docTable from "../../DocGeneration/tools/DocTable";
const FileSaver = require("file-saver");
import urldc from "../../_helpers/urllist.js";
import axios from "axios";
export default {
  data() {
    return {
      form: [],
      documentId: "",
      dbDoc: {},
      errormsg: "",
      filename: 2,
    };
  },
  mounted() {
    try {
      this.documentId = this.$route.params.id;
      this.filename = 2;
      this.createDoc();
    } catch (err) {
      this.errormsg = err.message;
    }
  },
  methods: {
    createDoc() {
      try {
        const url = urldc.getDcDocUrl(this.documentId);
        axios.get(url).then((res) => {
          console.log(
            "docdata: " + res.data.document.projectsPerso[0].technical_env
          );
          this.dbDoc = res.data;
        });
      } catch (err) {
        this.errormsg = err;
      }
      console.log("docdata: " + this.dbDoc);
      let docjs = this.dbDoc.document;
      const firstname = this.dbDoc.firstname;
      const familyname = this.dbDoc.familyname;
      const poste = this.dbDoc.poste;
      const nbexps = this.dbDoc.nbexps; 
      const doc = new Document({
        sections: [
          {
            properties: {
              titlePage: true,
            },
            headers: {
              first: docData.getFirstPageHeader(familyname, firstname, poste, nbexps),
              default: docData.getDefaultPageHeader(),
            },
            footers: {
              default: docData.getDefaultPageFooter(),
              first: docData.getFirstPageFooter(),
            },
            children: [docTable.getTable(docjs)],
          },
        ],
      });
      // To export into a .docx file

      var filen = this.getFileName(docjs.familyname, docjs.firstname);
       /* new Date().getFullYear() +""+
        this.getPadding(parseInt(new Date().getMonth()+1) +"")+
        this.getPadding(new Date().getDate()+"") +
        " _ Profil de " +
        docjs.firstname.trim() +
        docjs.familyname.trim() +
        ".docx";*/
      this.saveDocumentToFile(doc, filen);
    },
    getFileName(familyname, firstname){
      let name =  firstname.trim() + familyname.trim() ;
      if(this.filename==2)
      {
          name = firstname.trim().substr(0, 1).toUpperCase()+familyname.trim().substr(0, 2).toUpperCase();
      }
      return new Date().getFullYear() +""+
        this.getPadding(parseInt(new Date().getMonth()+1) +"")+
        this.getPadding(new Date().getDate()+"") +
        " _ Profil de " + name +
        ".docx";

    },
    getPadding(txt)
    {
      return txt.padStart(2,'0');
    },
    saveDocumentToFile(doc, fileName) {
      const mimeType =
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
      Packer.toBlob(doc).then((blob) => {
        const docblob = blob.slice(0, blob.size, mimeType);
        FileSaver.saveAs(docblob, fileName);
      });
    },
  },
};
</script>
<style scoped>
.example {
  margin: 20px;
}

.example input {
  display: none;
}

.example label {
  margin-right: 20px;
  display: inline-block;
  cursor: pointer;
}

.ex1 span {
  display: block;
  padding: 5px 10px 5px 25px;
  border: 2px solid #ddd;
  border-radius: 5px;
  position: relative;
  transition: all 0.25s linear;
}

.ex1 span:before {
  content: '';
  position: absolute;
  left: 5px;
  top: 50%;
  -webkit-transform: translatey(-50%);
  transform: translatey(-50%);
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background-color: #ddd;
  transition: all 0.25s linear;
}

.ex1 input:checked+span {
  background-color: #fff;
  box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.1);
}

.ex1 .red input:checked+span {
  color: red;
  border-color: red;
}

.ex1 .red input:checked+span:before {
  background-color: red;
}

.ex1 .blue input:checked+span {
  color: blue;
  border-color: blue;
}

.ex1 .blue input:checked+span:before {
  background-color: blue;
}
</style>