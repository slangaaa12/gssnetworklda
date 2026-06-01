import { NextResponse } from 'next/server';
import { addInstallationSubmission } from '@/lib/submissions';

export async function POST(request) {
  try {
    const body = await request.json();
    const {
      name,
      phone,
      email,
      type,
      plan,
      address,
      province,
      district,
      location,
      preferredDate,
      notes,
      lang,
    } = body;

    if (!name?.trim() || !phone?.trim() || !type || !plan?.trim() || !address?.trim() || !province?.trim() || !district?.trim()) {
      return NextResponse.json({ error: 'Campos obrigatórios em falta' }, { status: 400 });
    }

    const submission = await addInstallationSubmission({
      name: name.trim(),
      phone: phone.trim(),
      email: email?.trim() || '',
      type,
      plan: plan.trim(),
      address: address.trim(),
      province: province.trim(),
      district: district.trim(),
      location: location?.trim() || '',
      preferredDate: preferredDate || '',
      notes: notes?.trim() || '',
      lang: lang || 'pt',
    });

    return NextResponse.json({ success: true, id: submission.id });
  } catch (error) {
    console.error('Erro ao guardar solicitação de instalação:', error);
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
}
