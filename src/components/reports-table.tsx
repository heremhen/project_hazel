"use client";

import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getAllReport } from "@/lib/api/report";
import { getBackendURL } from "@/lib/cookie_helper";
import { Button } from "@/components/ui/button";
import { SearchCheck } from "lucide-react";
import Link from "next/link";
import Lottie from "lottie-react";
import animationData from "@/../public/lottie/loading.json";

interface Report {
  id: number;
  report_route: string;
  models_id: number;
  registry_id: number;
  model_name: string;
  registry_name: string;
  disabled: boolean;
  created_at: string;
  updated_at: string;
}

export function ReportsTableComponent() {
  const [reports, setReports] = useState<Report[]>([]);
  const [backendBase, setBackendBase] = useState<string | undefined>(undefined);
  const [isFetchingComplete, setFetchingComplete] = useState<boolean>(false);

  useEffect(() => {
    getAllReport().then((data) => setReports(data.data));
    async function fetchData() {
      const url = await getBackendURL();
      setBackendBase(url);
      setFetchingComplete(true);
    }
    fetchData();
  }, []);

  if (!isFetchingComplete) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-10/12 sm:w-1/2 lg:w-1/4">
          <Lottie
            animationData={animationData}
            className="flex justify-center items-center"
            loop={true}
          />
        </div>
      </div>
    );
  }

  return (
    <Table>
      <TableCaption>Сүүлд үүссэн тайлангуудын жагсаалтууд.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Модель</TableHead>
          <TableHead>Өгөгдөл</TableHead>
          <TableHead>Тайлан үүссэн огноо</TableHead>
          <TableHead className="text-right">Тайланг харах</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {reports.map((report) => (
          <TableRow key={report.model_name}>
            <TableCell className="font-medium">{report.model_name}</TableCell>
            <TableCell>{report.registry_name}</TableCell>
            <TableCell>{report.created_at}</TableCell>
            <TableCell className="text-right">
              <Button variant="outline" size="icon" asChild>
                <Link href={`${backendBase}${report.report_route}`}>
                  <SearchCheck className="h-4 w-4" />
                </Link>
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Хуудаслалт</TableCell>
          <TableCell className="text-right">
            Хараахан хийгдээгүй байна.
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
