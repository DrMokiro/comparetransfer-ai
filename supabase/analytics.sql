create schema if not exists analytics;

create or replace view analytics.business_kpis as
select
  (select count(*) from public.comparisons) as total_comparisons,
  (select count(*) from public.affiliate_clicks) as total_affiliate_clicks,
  case
    when (select count(*) from public.comparisons) = 0 then 0
    else round(
      ((select count(*) from public.affiliate_clicks)::numeric / (select count(*) from public.comparisons)::numeric) * 100,
      2
    )
  end as click_rate_percent,
  (select max(created_at) from public.comparisons) as last_comparison_at,
  (select max(created_at) from public.affiliate_clicks) as last_affiliate_click_at;

create or replace view analytics.clicks_by_provider as
select
  provider_id,
  provider_name,
  count(*) as total_clicks,
  min(created_at) as first_click_at,
  max(created_at) as last_click_at
from public.affiliate_clicks
group by provider_id, provider_name
order by total_clicks desc, provider_name asc;

create or replace view analytics.comparisons_by_corridor as
select
  from_country,
  to_country,
  send_currency,
  receive_currency,
  count(*) as total_comparisons,
  round(avg(amount), 2) as average_amount,
  min(created_at) as first_comparison_at,
  max(created_at) as last_comparison_at
from public.comparisons
group by from_country, to_country, send_currency, receive_currency
order by total_comparisons desc, last_comparison_at desc;

create or replace view analytics.recent_affiliate_clicks as
select
  provider_id,
  provider_name,
  affiliate_url,
  source,
  created_at
from public.affiliate_clicks
order by created_at desc
limit 50;
