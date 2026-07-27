import { NextRequest, NextResponse } from "next/server";

import { generateRequestId } from "@/lib/request-id";
import { logger } from "@/lib/logger";
import { validateAuditRequest } from "@/validators/audit.validator";
import { runAudit } from "@/services/audit.service";
import { successResponse, errorResponse } from "@/services/response.service";
import { AppError } from "@/lib/errors";

export async function POST(request: NextRequest) {
  const requestId = generateRequestId();

  try {
    const body = await request.json();

    const url = validateAuditRequest(body);

    logger.info({
      requestId,
      event: "audit_started",
      url,
    });

    const audit = await runAudit(url);

    logger.info({
      requestId,
      event: "audit_completed",
      url,
    });

    return NextResponse.json(
      successResponse(requestId, audit),
      {
        status: 200,
      }
    );
  } catch (error) {
    if (error instanceof AppError) {
      logger.error({
        requestId,
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

    logger.error({
      requestId,
      error,
    });

    return NextResponse.json(
      errorResponse(
        requestId,
        "INTERNAL_SERVER_ERROR",
        "Something went wrong."
      ),
      {
        status: 500,
      }
    );
  }
}