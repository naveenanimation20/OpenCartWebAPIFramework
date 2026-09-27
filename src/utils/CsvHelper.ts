
import fs from "fs";
import { parse } from 'csv-parse/sync';

export class CsvHelper {

    static readCsv(filePath: string): Record<string, string>[] {
        return parse(fs.readFileSync(filePath, "utf-8"), {
            columns: true, //first row as headers
            skip_empty_lines: true,
            trim: true, //trim spaces
            relax_column_count: true,
        }) as Record<string, string>[];
    }
}