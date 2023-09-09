/*
 * @Author: linwei
 * @Date: 2023-03-10 17:29:44
 */
const { Get, Post, Put, Delete, Patch, Options, Head, All, Api, Prefix, Apis, Middleware } = require('egg-shell-decorators');
// const { Parameters, Responses, Response, Schemas } = require('../swagger');
// const { Cacheable, CachePut, CacheEvict } = require('../cacheable');
// const { RateLimiter } = require('../ratelimiter');
const logger = require('./logger');
const sync = require('./sync');
// const { Transactional } = require('../sequelize');
// const { Background } = require('../background');
// const { Subscribe, Publish } = require('../emitter');

const { Logger } = logger;
const { Sync } = sync;

module.exports = {
  decorators: {
    Get,
    Post,
    Put,
    Delete,
    Patch,
    Options,
    Head,
    All,
    Api,
    Middleware,
    Prefix,
    Apis,
    // Parameters,
    // Responses,
    // Response,
    // Schemas,
    // Cacheable,
    // CachePut,
    // CacheEvict,
    // RateLimiter,
    Logger,
    Sync,
    // Transactional,
    // Background,
    // Subscribe,
    // Publish,
  },
  initializer(app) {
    logger.initializer(app);
    sync.initializer(app);
  },
};
