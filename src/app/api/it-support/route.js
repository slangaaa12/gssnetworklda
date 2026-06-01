import { NextResponse } from 'next/server';
import { addItSupportSubmission } from '@/lib/submissions';

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, company, phone, email, service, description, contactMethod, lang } = body;

    if (!name?.trim() || !phone?.trim() || !email?.trim() || !service?.trim() || !description?.trim() || !contactMethod) {
      return NextResponse.json({ error: 'Campos obrigatórios em falta' }, { status: 400 });
    }

    const submission = await addItSupportSubmission({
      name: name.trim(),
      company: company?.trim() || '',
      phone: phone.trim(),
      email: email.trim(),
      service: service.trim(),
      description: description.trim(),
      contactMethod,
      lang: lang || 'pt',
    });

    return NextResponse.json({ success: true, id: submission.id });
  } catch (error) {
    console.error('Erro ao guardar solicitação TI:', error);
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
}
