import { Module } from '@nestjs/common';
import { CacheModule as CacheModuleCustom } from '@nestjs/cache-manager';

import { CacheService } from './cache.service';

@Module({
  imports: [
    CacheModuleCustom.register({
      ttl: 900000000,
    }),
  ],
  controllers: [],
  providers: [CacheService],
  exports: [CacheService],
})
export class CacheModule {}
