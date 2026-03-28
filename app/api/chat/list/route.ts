import { NextRequest, NextResponse } from 'next/server';
import { listChatMessages, listChatMessagesByTicket, listChatMessagesSince } from '@/lib/services/chat';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const limit = Number(searchParams.get('limit') || '50');
    const ticketId = searchParams.get('ticket_id');
    const since = searchParams.get('since')?.trim() || null;
    console.log('[CHAT_LIST_API_START]', {
      limit,
      ticket_id: ticketId || null,
      since: since || null
    });

    const messages = ticketId
      ? await listChatMessagesByTicket(ticketId, limit)
      : since
        ? await listChatMessagesSince(since, limit)
        : await listChatMessages(limit);

    const latest5 = (messages || []).slice(-5).map((m: any) => ({
      id: m?.id || null,
      message: m?.message || '',
      created_at: m?.created_at || null,
      user_id: m?.user_id || null
    }));
    console.log('[CHAT_LIST_RESPONSE_LAST_IDS]', {
      limit,
      ticket_id: ticketId || null,
      ids: (messages || []).slice(-5).map((m: any) => m?.id || null)
    });
    console.log('[CHAT_LIST_API_RESULT]', {
      limit,
      ticket_id: ticketId || null,
      count: messages?.length || 0,
      latest5
    });

    const data = { messages };
    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || '채팅 목록 조회 실패' },
      { status: 500 }
    );
  }
}