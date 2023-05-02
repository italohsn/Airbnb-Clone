import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import { Prisma } from "@prisma/client";

interface IParams {
  reservationId?: string;
}

export async function DELETE(
  request: Request,
  { params}: {params: IParams}
) {
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    return NextResponse.error()
  }
  
  const { reservationId } = params;

  if (!reservationId || typeof reservationId !== 'string') {
    throw new Error('Id inválido')
  }

  const reservation = await prisma?.reservation.deleteMany({
    where: {
      id: reservationId,
      OR: [
        {userId: currentUser.id},
        {listing: {userId: currentUser.id}}
      ]
    }
  })
  
  return NextResponse.json(reservation)
}