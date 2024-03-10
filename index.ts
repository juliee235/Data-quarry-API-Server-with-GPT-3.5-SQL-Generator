import express, { Application, Request, Response } from "express";
import cors from "cors";
import { Configuration, OpenAIApi } from "openai";
import * as ibm_db from "ibm_db";
const openai_req : string = 'here is the data in DATABASE and table name NRDBA.LIST_AC_MA and this is example of the data {"DATA_DT": "2023-07-13","CIF_NO": "34062521","AC_NO": "6700598273","LDGR_BAL": 0,"AC_ST": "00","SEQ_NO": 0,"STRT_DT": null,"EXP_DT": null,"RSTN": "","END_DT": null,"OPN_DT": "2022-09-12","COST_CTR_CODE": "201100"} and NRDBA.SUMDRCR = {"DATA_DT": "2023-05-31","AC_NO": "005110568111","DRCNT": 1,"DRSUM": 32167,"CRCNT": 2,"CRSUM": 1181708} create a SQL request to '
const app: Application = express();
app.use(cors());
app.use(express.json());

const API_KEY: string = "Your API to GPT";
const configuration = new Configuration({
  apiKey: API_KEY,
});
const openai = new OpenAIApi(configuration);

const PORT: number = 8000;
app.post("/completions", async (req: Request, res: Response) => {
  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: openai_req + req.body.message + " answer only sql code in the same line,don't forget to put semicolon at the end",
        },
      ],
    });
    const gpt3Response = completion.data.choices[0].message;
    console.log(gpt3Response)
    const data = JSON.stringify(gpt3Response);
    const startIndex = data.indexOf("SELECT");
    const endIndex = data.lastIndexOf(";");

    if (startIndex !== -1 && endIndex !== -1 && endIndex > startIndex) {
      const sqlQuery = data.substring(startIndex, endIndex + 1).replace(/\\n/g, ' ').replace(/\\/g, ' ');

      console.log(sqlQuery);

      const connectionString =
        "DATABASE=databasename;HOSTNAME=yourhostname;PORT=port_num;PROTOCOL=TCPIP;UID=user_id;PWD=password";

      try {
        const connection = await ibm_db.open(connectionString);
        console.log("Connected to the IBM DB2 database");

        // Perform database operations here
        connection.query(sqlQuery, (err: Error, dbData: any[]) => {
          if (err) {
            console.error("Failed to execute query:", err);
            res.status(500).json({ gpt3Response, dbData: null, error: "Failed to execute query" });
          } else {
            console.log("Query results:", dbData);
            res.status(200).json({ gpt3Response, dbData });
          }

          connection.close(() => {
            console.log("Connection closed");
          });
        });
      } catch (error) {
        console.error("Failed to connect to the IBM DB2 database:", error);
        res.status(500).json({ gpt3Response, dbData: null, error: "Failed to connect to the IBM DB2 database" });
      }
    } else {
      console.error("Invalid SQL query format");
      res.status(400).json({ gpt3Response, dbData: null, error: "Invalid SQL query format" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ gpt3Response: null, dbData: null, error: "Server error" });
  }
});

app.listen(PORT, () => console.log(`Your server is running on PORT ${PORT}`));
