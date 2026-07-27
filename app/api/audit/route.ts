import { NextRequest, NextResponse } from "next/server";

import { generateRequestId } from "@/lib/request-id";
import { createRequestLogger } from "@/lib/request-logger";

import { validateAuditRequest } from "@/validators/audit.validator";
import { runAudit } from "@/services/audit.service";
import { successResponse, errorResponse } from "@/services/response.service";

import { AppError } from "@/lib/errors";

export async function POST(request: NextRequest) {
  const requestId = generateRequestId();

  const log = createRequestLogger(requestId);

  try {
    const body = await request.json();

    const url = validateAuditRequest(body);

    log.info({
      event: "audit_started",
      url,
    });

    const result = await runAudit(url);

    log.info({
      event: "audit_completed",
      url,
    });

    return NextResponse.json(
      successResponse(requestId, result),
      {
        status: 200,
      }
    );
  } catch (error) {
    if (error instanceof AppError) {
      log.error({
        event: "audit_failed",
        code: error.code,
        message: error.message,
      });

      return NextResponse.json(
        errorResponse(
          requestId,
          error.code,
          error.message
        ),
        {
          status: error.statusCode,
        }
      );
    }

    log.error({
      event: "internal_error",
      error,
    });

    return NextResponse.json(
      errorResponse(
        requestId,
        "INTERNAL_SERVER_ERROR",
        "Internal Server Error"
      ),
      {
        status: 500,
      }
    );
  }
}