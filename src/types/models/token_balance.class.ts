import { ApiProperty } from "@nestjs/swagger";

export class TokenBalance {
  @ApiProperty()
  tokenId: string

  @ApiProperty()
  balance: number

  @ApiProperty()
  decimals: number
}