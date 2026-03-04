import { NextRequest, NextResponse } from "next/server";
  import { createSupabaseAdmin } from "../../../../../../../../packages/admin/src/lib/supabase";

  import originalHandler from "../../../../../../../../packages/admin/src/pages/api/admin/setup/feature-toggles";

  async function handleRequest(request: NextRequest) {
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
        query: searchParams,
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

      originalHandler(req, res);
    });
  }

  export async function GET(request: NextRequest) {
    return handleRequest(request);
  }

  export async function POST(request: NextRequest) {
    return handleRequest(request);
  }

  export async function PUT(request: NextRequest) {
    return handleRequest(request);
  }

  export async function DELETE(request: NextRequest) {
    return handleRequest(request);
  }
  