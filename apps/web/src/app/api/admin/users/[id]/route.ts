import { NextRequest, NextResponse } from "next/server";
import originalHandler from "../../../../../../../../packages/admin/src/pages/api/admin/users/[id]";

async function handleRequest(request: NextRequest, context: { params: { id: string } }) {
  const url = new URL(request.url);
  const searchParams = Object.fromEntries(url.searchParams.entries());

  let body = null;
  if (request.method !== "GET" && request.method !== "HEAD") {
    try {
      body = await request.json();
    } catch {
      body = {};
    }
  }

  return new Promise<NextResponse>((resolve) => {
    const req = {
      method: request.method,
      query: { ...searchParams, id: context.params.id },
      body,
      headers: Object.fromEntries(request.headers.entries()),
    } as any;

    const res = {
      statusCode: 200,
      _headers: {} as Record<string, string>,
      status(code: number) {
        this.statusCode = code;
        return this;
      },
      json(data: any) {
        resolve(NextResponse.json(data, { status: this.statusCode }));
      },
      setHeader(key: string, value: string) {
        this._headers[key] = value;
        return this;
      },
    } as any;

    try {
      const result = originalHandler(req, res);
      if (result && typeof result.catch === "function") {
        result.catch((err: any) => {
          console.error("Admin API error:", err);
          resolve(NextResponse.json({ error: "Internal server error" }, { status: 500 }));
        });
      }
    } catch (err) {
      console.error("Admin API error:", err);
      resolve(NextResponse.json({ error: "Internal server error" }, { status: 500 }));
    }
  });
}

export async function GET(request: NextRequest, context: { params: { id: string } }) {
  return handleRequest(request, context);
}

export async function POST(request: NextRequest, context: { params: { id: string } }) {
  return handleRequest(request, context);
}

export async function PUT(request: NextRequest, context: { params: { id: string } }) {
  return handleRequest(request, context);
}

export async function DELETE(request: NextRequest, context: { params: { id: string } }) {
  return handleRequest(request, context);
}
